import {invoker, pipe} from 'ramda';

export const selectAll = invoker(1, 'selectAll');
export const data = invoker(1, 'data');
export const data2 = invoker(2, 'data');
export const enter = invoker(0, 'enter');
export const exit = invoker(0, 'exit');
export const append = invoker(1, 'append');
export const classed = invoker(2, 'classed');
export const attr = invoker(1, 'attr');
export const attr2 = invoker(2, 'attr');
export const style = invoker(1, 'style');
export const style2 = invoker(2, 'style');
export const text = invoker(1, 'text');
export const remove = invoker(0, 'remove');

export const thread = (x, ...fns) => pipe(...fns)(x);

