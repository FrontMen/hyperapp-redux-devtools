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
var hyperapp_redux_devtools_types_1 = require("./hyperapp-redux-devtools-types");
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
exports.withReduxDevtools = function (app) { return function (state, actions, view, root) {
    var wiredActions = app(state, __assign({}, actions, { reduxDevToolsGetState: function () { return function (state) { return state; }; } }), view, root);
    function wrapActions(actions, prefix) {
        if (prefix === void 0) { prefix = null; }
        var namespace = prefix ? prefix + '.' : '';
        Object.keys(actions || {}).forEach(function (actionName) {
            var originalAction = actions[actionName];
            if (hyperapp_redux_devtools_types_1.HyperappReduxDevtools.isWiredActionsObject(originalAction)) {
                wrapActions(originalAction, namespace + actionName);
            }
            else {
                actions[actionName] = function (data) {
                    var result = originalAction(data);
                    if (actionName !== 'reduxDevToolsGetState') {
                        sendToReduxDevtools(namespace + actionName, data || {}, wiredActions.reduxDevToolsGetState());
                    }
                    return result;
                };
            }
        });
    }
    var devtools = initReduxDevtools(state);
    wrapActions(wiredActions);
    return wiredActions;
}; };
exports["default"] = exports.withReduxDevtools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUZBQStFO0FBUy9FLDZCQUNFLElBQVksRUFDWixPQUFrQyxFQUNsQyxRQUFtQztJQUU3QixNQUFPLENBQUMsNEJBQTRCO1FBQ2xDLE1BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQzdDO1lBQ0UsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLFNBQUE7U0FDUixFQUNELFFBQVEsQ0FDVCxDQUFDO0FBQ04sQ0FBQztBQVFELDJCQUEyQixLQUF1QjtJQUNoRCxJQUFNLFFBQVEsR0FBUyxNQUFPLENBQUMsNEJBQTRCO1FBQ3pELENBQUMsQ0FBTyxNQUFPLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFO1FBQ3RELENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDZCxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFRWSxRQUFBLGlCQUFpQixHQUFHLFVBQy9CLEdBQVksSUFDVCxPQUFBLFVBQ0gsS0FBcUIsRUFDckIsT0FBMkIsRUFDM0IsSUFBc0MsRUFDdEMsSUFBaUI7SUFFakIsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUN0QixLQUFLLGVBRUEsT0FBTyxJQUNWLHFCQUFxQixFQUFFLGNBQU0sT0FBQSxVQUFDLEtBQXVCLElBQUssT0FBQSxLQUFLLEVBQUwsQ0FBSyxFQUFsQyxDQUFrQyxLQUVqRSxJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7SUFRRixxQkFDRSxPQUFpQyxFQUNqQyxNQUE0QjtRQUE1Qix1QkFBQSxFQUFBLGFBQTRCO1FBRTVCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7WUFDM0MsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLEVBQUUsQ0FBQyxDQUFDLHFEQUFHLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxXQUFXLENBQUMsY0FBYyxFQUFFLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQUEsSUFBSTtvQkFDeEIsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxtQkFBbUIsQ0FDakIsU0FBUyxHQUFHLFVBQVUsRUFDdEIsSUFBSSxJQUFJLEVBQUUsRUFDVixZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FDckMsQ0FBQztvQkFDSixDQUFDO29CQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUN0QixDQUFDLEVBckRJLENBcURKLENBQUM7QUFFRixxQkFBZSx5QkFBaUIsQ0FBQyJ9