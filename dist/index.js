"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
function sendToReduxDevtools(name, payload, newState) {
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__.send({
            type: name,
            payload: payload
        }, newState);
}
function initReduxDevtools(state) {
    var devTools = window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__.connect()
        : undefined;
    devTools && devTools.init(state);
    return devTools;
}
exports.withDevTools = function (app) { return function (state, actions, view, root) {
    var wiredActions = app(state, __assign({}, actions, { devToolsGetState: function (_) { return function (state) { return state; }; } }), view, root);
    function wrapActions(actions, prefix) {
        if (prefix === void 0) { prefix = null; }
        var namespace = prefix ? prefix + '.' : '';
        Object.keys(actions || {}).forEach(function (actionName) {
            var originalAction = actions[actionName];
            if (typeof originalAction !== 'function') {
                wrapActions(actions[actionName], namespace + actionName);
            }
            else {
                actions[actionName] = function (data) {
                    var res = originalAction(data);
                    if (actionName !== 'devToolsGetState') {
                        sendToReduxDevtools(namespace + actionName, data, wiredActions.devToolsGetState());
                    }
                    return res;
                };
            }
        });
    }
    var devtools = initReduxDevtools(state);
    wrapActions(wiredActions);
    return wiredActions;
}; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQ0UsSUFBWSxFQUNaLE9BQStCLEVBQy9CLFFBQWdDO0lBRTFCLE1BQU8sQ0FBQyw0QkFBNEI7UUFDbEMsTUFBTyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FDN0M7WUFDRSxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sU0FBQTtTQUNSLEVBQ0QsUUFBUSxDQUNULENBQUM7QUFDTixDQUFDO0FBRUQsMkJBQTJCLEtBQVU7SUFDbkMsSUFBTSxRQUFRLEdBQVMsTUFBTyxDQUFDLDRCQUE0QjtRQUN6RCxDQUFDLENBQU8sTUFBTyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sRUFBRTtRQUN0RCxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRVksUUFBQSxZQUFZLEdBQUcsVUFBQSxHQUFHLElBQUksT0FBQSxVQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDNUQsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUN0QixLQUFLLGVBRUEsT0FBTyxJQUNWLGdCQUFnQixFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxFQUFkLENBQWMsS0FFdkMsSUFBSSxFQUNKLElBQUksQ0FDTCxDQUFDO0lBRUYscUJBQXFCLE9BQU8sRUFBRSxNQUE0QjtRQUE1Qix1QkFBQSxFQUFBLGFBQTRCO1FBQ3hELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7WUFFM0MsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sY0FBYyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBQSxJQUFJO29CQUN4QixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7d0JBQ3RDLG1CQUFtQixDQUNqQixTQUFTLEdBQUcsVUFBVSxFQUN0QixJQUFJLEVBQ0osWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQ2hDLENBQUM7b0JBQ0osQ0FBQztvQkFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNiLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUN0QixDQUFDLEVBeENrQyxDQXdDbEMsQ0FBQyJ9