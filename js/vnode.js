import {is, pickBy, omit} from 'ramda';

const isFunction = is(Function);

function parseAttributes(attributes) {
  const functionPicker = pickBy((v) => isFunction(v));
  const scalarPicker = pickBy((v) => !isFunction(v));

  const {style, className, textContent, id} = attributes;
  const attrs = omit(['style', 'className', 'id', 'text'], attributes);

  return {
    boundAttributes: {
      attributes: functionPicker(attrs),
      style: functionPicker(style || {}),
      textContent: isFunction(textContent) ? textContent : undefined,
      className: isFunction(className) ? className : undefined,
      id: isFunction(id) ? id : undefined
    },
    constantAttributes: {
      attributes: scalarPicker(attrs),
      style: scalarPicker(style || {}),
      textContent: !isFunction(textContent) ? textContent : undefined,
      className: !isFunction(className) ? className : undefined,
      id: !isFunction(id) ? id : undefined
    }
  }
}

// TODO: it's dummy implementation
function parseSelector(selector) {
  const splitByHash = selector.split('#');
  const splitByDots = splitByHash[0].split('.');
  const tagName = splitByDots[0] === '' ? 'div' : splitByDots[0];
  const classList = splitByDots.slice(1);
  return {tagName, classList, id: splitByHash[1] || null};
}

const parseChildren = (children) => ({
  boundChildren: children.filter((child) => !isVNode(child)),
  constantChildren: children.filter((child) => isVNode(child)),
  textChildren: children.filter(is(String))
});

class VNode {
  constructor(selector, attributes, children) {
    Object.assign(this,
      {selector},
      parseSelector(selector),
      parseAttributes(attributes),
      parseChildren(children)
    );
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

  getBoundAttributes() {
    return this.boundAttributes.attributes;
  }

  getConstantAttributes() {
    return this.constantAttributes.attributes;
  }

  getConstantChildren() {
    return this.constantChildren;
  }

  getBoundChildren() {
    return this.boundChildren;
  }

  getTextChildren() {
    return this.textChildren;
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
