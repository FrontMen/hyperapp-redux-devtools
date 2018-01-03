import { h, app } from 'hyperapp';
import withDevTools from '../index';
declare const global: { [key: string]: any };

describe('#withDevtools', () => {
  test('without actions', done =>
    withDevTools(app)(undefined, undefined, () => done(), undefined));

  test('connect to redux devtools', done => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: () => done(),
      init: jest.fn(),
    };
    withDevTools(app)({}, {}, () => {}, undefined);
  });
  test('send to redux devtools', done => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: jest.fn(),
      init: jest.fn(),
      send: () => done(),
    };

    withDevTools(app)(
      {},
      {
        foo: () => (state: any) => state,
      },
      undefined,
      undefined
    ).foo();
  });
  test('send sliced action to redux devtools', done => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: jest.fn(),
      init: jest.fn(),
      send: () => done(),
    };

    withDevTools(app)(
      {},
      {
        foo: { bar: () => (state: any) => state },
      },
      undefined,
      undefined
    ).foo.bar();
  });
  test("doesn't interfere with state updates", done => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: jest.fn(),
      init: jest.fn(),
      send: jest.fn(),
    };
    const actions = withDevTools(app)(
      {
        value: 0,
      },
      {
        get: () => (state: any) => state,
        up: (by: number) => (state: any) => ({
          value: state.value + by,
        }),
        finish: () => (state: any, actions: any) => {
          actions.exit();
        },
        exit: () => {
          done();
        },
      },
      undefined,
      undefined
    );

    expect(actions.get()).toEqual({
      value: 0,
    });

    expect(actions.up(2)).toEqual({
      value: 2,
    });

    expect(actions.get()).toEqual({
      value: 2,
    });

    actions.finish();
  });

  test("doesn't interfere with custom container", done => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = {
      connect: jest.fn(),
      init: jest.fn(),
      send: jest.fn(),
    };
    document.body.innerHTML = '<main></main>';
    withDevTools(app)(
      {},
      {},
      (state: any) =>
        h(
          'div',
          {
            oncreate() {
              expect(document.body.innerHTML).toBe(
                '<main><div>foo</div></main>'
              );
              done();
            },
          },
          'foo'
        ),
      document.body.firstChild
    );
  });
});
