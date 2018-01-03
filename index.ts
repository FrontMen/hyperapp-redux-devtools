function sendToReduxDevtools(
  name: string,
  payload: { [key: string]: any },
  newState: { [key: string]: any }
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

function initReduxDevtools(state: any) {
  const devTools = (<any>window).__REDUX_DEVTOOLS_EXTENSION__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__.connect()
    : undefined;
  devTools && devTools.init(state);
  return devTools;
}

export default app => (state, actions, view, root) => {
  const wiredActions = app(
    state,
    {
      ...actions,
      reduxDevToolsGetState: _ => state => state,
    },
    view,
    root
  );

  function wrapActions(actions, prefix: string | null = null) {
    var namespace = prefix ? prefix + '.' : '';

    Object.keys(actions || {}).forEach(actionName => {
      // ignore nesting for brevity
      let originalAction = actions[actionName];

      if (typeof originalAction !== 'function') {
        wrapActions(actions[actionName], namespace + actionName);
      } else {
        actions[actionName] = data => {
          var result = originalAction(data);
          if (actionName !== 'reduxDevToolsGetState') {
            sendToReduxDevtools(
              namespace + actionName,
              data,
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
