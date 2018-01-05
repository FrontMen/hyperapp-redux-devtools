import { VNode, ActionsType } from 'hyperapp';
import { HyperappReduxDevtools as HRD } from './hyperapp-redux-devtools-types';

/**
 * Function to log to devtools
 * 
 * @param {string} name the action name that'll be logged by Redux Dev Tools
 * @param {HRD.Map<HRD.StateContent>} payload the payload being passed to the reducer in Redux Dev Tools
 * @param {HRD.Map<HRD.StateContent>} newState the resulting new state from the reducer that's logged in Redux Dev Tools
 */
function sendToReduxDevtools(
  name: string,
  payload: HRD.Map<HRD.StateContent>,
  newState: HRD.Map<HRD.StateContent>
) {
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
 * @param {HRD.StateContent} state 
 * @returns {*} Redux dev tools reference
 */
function initReduxDevtools(state: HRD.StateContent) {
  const devTools = (<any>window).__REDUX_DEVTOOLS_EXTENSION__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__.connect()
    : undefined;
  devTools && devTools.init(state);
  return devTools;
}

/**
 * function that wraps the app in a redux dev tools.
 * 
 * @param {HRD.App} app 
 * @returns {HRD.Map<WiredAction>} returns all wired actions
 */
export const withReduxDevtools = <State extends HRD.StateContent>(app: any) => (
  state: HRD.Map<State>,
  actions: HRD.UnwiredActions,
  view: VNode<HRD.Map<HRD.StateContent>>,
  root: HTMLElement
) => {
  const wiredActions = app(
    state,
    {
      ...actions,
      reduxDevToolsGetState: () => (state: HRD.StateContent) => state,
    },
    view,
    root
  );

  /**
   * Wraps all wired actions with the redux logger
   * 
   * @param {HRD.Map<HRD.WiredAction>} actions 
   * @param {(string | null)} [prefix=null] 
   */
  function wrapActions(
    actions: HRD.Map<HRD.WiredAction>,
    prefix: string | null = null
  ) {
    var namespace = prefix ? prefix + '.' : '';

    Object.keys(actions || {}).forEach(actionName => {
      let originalAction = actions[actionName];

      if (HRD.isWiredActionsObject(originalAction)) {
        wrapActions(originalAction, namespace + actionName);
      } else {
        actions[actionName] = data => {
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
