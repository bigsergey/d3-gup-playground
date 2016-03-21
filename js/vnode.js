import {is} from 'ramda';

const isFunction = is(Function);

function parseAttributes(attrs) {
  return {
    dynamic: {
      attributes: {},
      style: {},
      textContent: '',
      classList: [],
      id: null
    },
    static: {
      attributes: {},
      style: {},
      textContent: '',
      classList: [],
      id: null
    }
  }
}

// TODO: it's dummy implementation
function parseSelector(selector) {
  const splitByHash = selector.split('#');
  const id = splitByHash[1] || null;
  const splitByDots = splitByHash[0].split('.');
  const tagName = splitByDots[0] === '' ? 'div' : splitByDots[0];
  const classList = splitByDots.slice(1);
  return {tagName, classList, id};
}

function parseChildren(children) {
  const staticChildren = children.filter((child) => isVNode(child));
  const boundChildren = children.filter((child) => !isVNode(child));
  return {boundChildren, staticChildren};
}

class VNode {
  constructor(selector, attributes, children) {
    this.selector = selector;
    const {tagName, classList, id} = parseSelector(selector);
    this.classList = classList;
    this.tagName = tagName;
    this.id = id;
    this.attributes = parseAttributes(attributes);
    const {staticChildren, boundChildren} = parseChildren(children);
    this.staticChildren = staticChildren;
    this.boundChildren = boundChildren;
  }

  getTagName() {
    return this.tagName;
  }

  getSelector() {
    return this.selector;
  }

  ensureSelector(selection) {
    selection
      .classed(this.classList.join(' '), true)
      .attr('id', this.id);
  }

  getStaticAttrs() {
    return this.attributes.static.attrs;
  }

  getDynamicAttrs() {
    return this.attributes.dynamic.attrs;
  }

  getStaticChildren() {
    return this.staticChildren;
  }

  getBoundChildren() {
    return this.boundChildren;
  }
}

const isVNode = is(VNode);

export const h = (selector, attributes, ...content) => {
  const hasAttrs = !isFunction(attributes) && !isVNode(attributes);
  return new VNode(
    selector,
    hasAttrs ? attributes : {},
    hasAttrs ? content : [attributes, ...content]);
};
