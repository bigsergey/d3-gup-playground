import {is} from 'ramda';

function parseAttributes(attrs) {
  return {
    dynamic: {
      attrs: {},
      style: {},
      textContent: '',
      classList: []
    },
    static: {
      attrs: {},
      style: {},
      textContent: '',
      classList: []
    }
  }
}

class VNode {
  constructor(tagName, selector, attributes, children) {
    // assert selector for classes
    if (!/\.[A-z\-]+/.test(selector)) {
      throw 'handles only class names as selectors';
    }
    this.className = selector.substring(1);
    this.tagName = tagName;
    this.attributes = parseAttributes(attributes);
    this.children = children;
  }

  getTagName() {
    return this.tagName;
  }

  getSelector() {
    return `.${this.className}`
  }

  ensureSelector(selection) {
    selection.classed(this.className, true);
  }

  getStaticAttrs() {
    return this.attributes.static.attrs;
  }

  getDynamicAttrs() {
    return this.attributes.dynamic.attrs;
  }

  getChildren() {
    return this.children;
  }
}

export const createVNode = (tagName) =>
  (selector, attrs, ...children) =>
    new VNode(tagName, selector, attrs, children);
