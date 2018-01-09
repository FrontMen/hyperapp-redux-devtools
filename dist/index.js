(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
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
exports.withReduxDevtools = function (app) { return function (state, actions, view, root) {
    var wiredActions = app(state, __assign({}, actions, { reduxDevToolsGetState: function () { return function (state) { return state; }; } }), view, root);
    function wrapActions(actions, prefix) {
        if (prefix === void 0) { prefix = null; }
        var namespace = prefix ? prefix + '.' : '';
        Object.keys(actions || {}).forEach(function (actionName) {
            var originalAction = actions[actionName];
            if (typeof originalAction !== 'function') {
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

})));
//# sourceMappingURL=index.js.map
