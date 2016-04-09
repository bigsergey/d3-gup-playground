import {h} from './vnode';
import {curry, identity} from 'ramda';
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
  style2,
  text,
  remove
} from './d3-fun';

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

export function gup(
  parent,
  nodeData,
  vNode,
  {enterTransform = identity, exitTransform = identity} = {}
) {
  const selection = thread(
    parent,
    selectAll(vNode.getSelector()),
    data(nodeData)
  );

  const enterSelection = thread(
    selection,
    enter,
    appendVNode(vNode),
    setSelector(vNode),
    enterTransform
  );

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
}

export const gup1 = (data, content) =>
  (selection) =>
    gup(selection, data, content);
