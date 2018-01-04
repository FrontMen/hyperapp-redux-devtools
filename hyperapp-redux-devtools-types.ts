/**
* Necessary types for hyperapp's WiredActions
*/
declare const window: HyperappReduxDevtools.Map<any>;

import { VNode } from 'hyperapp';

export namespace HyperappReduxDevtools {
  export interface Map<T> {
    [key: string]: T;
  }
  export interface UnwiredActions extends Map<UnwiredAction> {}
  export interface UnwiredAction {
    <State>(payload?: StateContent): (
      state: State,
      actions: Map<WiredAction>
    ) => State;
  }

  export interface WiredAction {
    (payload?: Map<StateContent>): Map<StateContent>;
  }

  export interface StateContent
    extends Map<string | boolean | number | StateContent> {}

  export interface App {
    (
      state: Map<StateContent>,
      actions: any,
      view: VNode<Map<StateContent>>,
      root: HTMLElement
    ): Map<WiredAction>;
  }

  /**
   * Returns whether the argument is a WiredAction of WiredActions
   * Is necessary as type guard for TypeScript: 
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
   * 
   * @param {(WiredAction | WiredActions)} actionOrActionsObject 
   * @returns {actionOrActionsObject is WiredActions} 
   */
  export function isWiredActionsObject(
    actionOrActionsObject: WiredAction | Map<WiredAction>
  ): actionOrActionsObject is Map<WiredAction> {
    return typeof actionOrActionsObject !== 'function';
  }
}
