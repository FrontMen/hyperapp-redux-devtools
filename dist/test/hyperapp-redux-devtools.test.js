"use strict";
exports.__esModule = true;
var hyperapp_1 = require("hyperapp");
var index_1 = require("../index");
describe('#withDevtools', function () {
    test('without actions', function (done) {
        return index_1["default"](hyperapp_1.app)(undefined, undefined, function () { return done(); }, undefined);
    });
    test('connect to redux devtools', function (done) {
        global.__REDUX_DEVTOOLS_EXTENSION__ = {
            connect: function () { return done(); },
            init: jest.fn()
        };
        index_1["default"](hyperapp_1.app)({}, {}, function () { }, undefined);
    });
    test('send to redux devtools', function (done) {
        global.__REDUX_DEVTOOLS_EXTENSION__ = {
            connect: jest.fn(),
            init: jest.fn(),
            send: function () { return done(); }
        };
        index_1["default"](hyperapp_1.app)({}, {
            foo: function () { return function (state) { return state; }; }
        }, undefined, undefined).foo();
    });
    test('send sliced action to redux devtools', function (done) {
        global.__REDUX_DEVTOOLS_EXTENSION__ = {
            connect: jest.fn(),
            init: jest.fn(),
            send: function () { return done(); }
        };
        index_1["default"](hyperapp_1.app)({}, {
            foo: { bar: function () { return function (state) { return state; }; } }
        }, undefined, undefined).foo.bar();
    });
    test("doesn't interfere with state updates", function (done) {
        global.__REDUX_DEVTOOLS_EXTENSION__ = {
            connect: jest.fn(),
            init: jest.fn(),
            send: jest.fn()
        };
        var actions = index_1["default"](hyperapp_1.app)({
            value: 0
        }, {
            get: function () { return function (state) { return state; }; },
            up: function (by) { return function (state) { return ({
                value: state.value + by
            }); }; },
            finish: function () { return function (state, actions) {
                actions.exit();
            }; },
            exit: function () {
                done();
            }
        }, undefined, undefined);
        expect(actions.get()).toEqual({
            value: 0
        });
        expect(actions.up(2)).toEqual({
            value: 2
        });
        expect(actions.get()).toEqual({
            value: 2
        });
        actions.finish();
    });
    test("doesn't interfere with custom container", function (done) {
        global.__REDUX_DEVTOOLS_EXTENSION__ = {
            connect: jest.fn(),
            init: jest.fn(),
            send: jest.fn()
        };
        document.body.innerHTML = '<main></main>';
        index_1["default"](hyperapp_1.app)({}, {}, function (state) {
            return hyperapp_1.h('div', {
                oncreate: function () {
                    expect(document.body.innerHTML).toBe('<main><div>foo</div></main>');
                    done();
                }
            }, 'foo');
        }, document.body.firstChild);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJhcHAtcmVkdXgtZGV2dG9vbHMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvaHlwZXJhcHAtcmVkdXgtZGV2dG9vbHMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFrQztBQUNsQyxrQ0FBb0M7QUFHcEMsUUFBUSxDQUFDLGVBQWUsRUFBRTtJQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBQSxJQUFJO1FBQzFCLE9BQUEsa0JBQVksQ0FBQyxjQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLEVBQUUsU0FBUyxDQUFDO0lBQWhFLENBQWdFLENBQUMsQ0FBQztJQUVwRSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsVUFBQSxJQUFJO1FBQ3BDLE1BQU0sQ0FBQyw0QkFBNEIsR0FBRztZQUNwQyxPQUFPLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBRSxFQUFOLENBQU07WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztRQUNGLGtCQUFZLENBQUMsY0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxjQUFPLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyx3QkFBd0IsRUFBRSxVQUFBLElBQUk7UUFDakMsTUFBTSxDQUFDLDRCQUE0QixHQUFHO1lBQ3BDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNO1NBQ25CLENBQUM7UUFFRixrQkFBWSxDQUFDLGNBQUcsQ0FBQyxDQUNmLEVBQUUsRUFDRjtZQUNFLEdBQUcsRUFBRSxjQUFNLE9BQUEsVUFBQyxLQUFVLElBQUss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