import { VNode, ActionsType, View } from 'hyperapp';

/**
 * Function to log to devtools
 * 
 * @param {string} name the action name that'll be logged by Redux Dev Tools
 * @param {any} payload the payload being passed to the reducer in Redux Dev Tools
 * @param {any} newState the resulting new state from the reducer that's logged in Redux Dev Tools
 */
function sendToReduxDevtools(name: string, payload: any, newState: any) {
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ &&
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__.send(
      {
        type: name,
        payload,
      },
      newState
    );
}

/**
 * Initializes singleton of Redux Dev Tools with initial state
 * 
 * @param {any} state 
 * @returns {*} Redux dev tools reference
 */
function initReduxDevtools(state: any) {
  const devTools = (<any>window).__REDUX_DEVTOOLS_EXTENSION__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__.connect()
    : undefined;
  devTools && devTools.init(state);
  return devTools;
}

/**
 * function that wraps the app in a redux dev tools.
 * 
 * @param {any} app 
 * @returns {any} returns all wired actions
 */
export const withReduxDevtools = <State>(app: any) => (
  state: State,
  actions: any,
  view: View<State, any>,
  root: HTMLElement
) => {
  const wiredActions = app(
    state,
    {
      ...actions,
      reduxDevToolsGetState: () => (state: State) => state,
    },
    view,
    root
  );

  /**
   * Wraps all wired actions with the redux logger
   * 
   * @param {any} actions 
   * @param {(string | null)} [prefix=null] 
   */
  function wrapActions(actions: any, prefix: string | null = null) {
    var namespace = prefix ? prefix + '.' : '';

    Object.keys(actions || {}).forEach(actionName => {
      let originalAction = actions[actionName];

      if (typeof originalAction !== 'function') {
        wrapActions(originalAction, namespace + actionName);
      } else {
        actions[actionName] = (data: any) => {
          var result = originalAction(data);
          if (actionName !== 'reduxDevToolsGetState') {
            sendToReduxDevtools(
              namespace + actionName,
              data || {},
              wiredActions.reduxDevToolsGetState()
            );
          }

          return result;
        };
      }
    });
  }

  const devtools = initReduxDevtools(state);
  wrapActions(wiredActions);
  return wiredActions;
};

export default withReduxDevtools;
