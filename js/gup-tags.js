import {h} from './vnode';

export const div = (selector, attrs, ...children) =>
  h(`div${selector}`, attrs, ...children);

export const span = (selector, attrs, ...children) =>
  h(`span${selector}`, attrs, ...children);