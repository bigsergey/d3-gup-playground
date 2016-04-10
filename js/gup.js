import {h} from './vnode';
import {curry, identity, is} from 'ramda';
import {
  thread,
  selectAll,
  data,
  data2,
  enter,
  exit,
  append,
  classed,
  attr,
  attr2,
  style,
  text,
  remove
} from './d3-fun';

export const gup = (parent, ...fns) =>
  fns.forEach((fn) => fn(parent));

const setSelector = curry(
  (vNode, selection) => thread(
    selection,
    classed(vNode.getClassList().join(' '), true),
    attr2('id', vNode.getId())
  )
);

const appendVNode = (vNode) =>
  (selection) =>
    thread(
      selection,
      append(vNode.getTagName()),
      attr(vNode.getConstantAttributes()),
      style(vNode.getConstantStyles()),
      text(vNode.getTextChildren().join(''))
    );

export const bind = (nodeData, vNode, xf) =>
  _bind(data(nodeData), vNode, xf);

export const bind2 = (nodeData, keySelector, vNode, xf) =>
  _bind(data2(nodeData, keySelector), vNode, xf);

export const _bind =
  (dataFn, vNode, {enterTransform = identity, exitTransform = identity} = {}) =>
    function(parent) {
      const selection = thread(
        parent,
        selectAll(vNode.getSelector()),
        dataFn
      );

      const enterSelection = thread(
        selection,
        enter,
        appendVNode(vNode),
        setSelector(vNode)
      );

      enterTransform(enterSelection);

      thread(
        selection,
        attr(vNode.getBoundAttributes()),
        style(vNode.getBoundStyles()),
        text(vNode.getBoundTextContent())
      );

      vNode.getConstantChildren()
        .forEach((child) =>
          thread(
            enterSelection,
            appendVNode(child),
            setSelector(child)
          )
        );

      vNode.getBoundChildren()
        .forEach((child) => child(selection));

      thread(
        selection,
        exit,
        exitTransform,
        remove
      );

      return selection;
    };
