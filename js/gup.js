import {h} from './vnode';
import {curry} from 'ramda';
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
  text,
  remove
} from './d3-fun';

const ensureSelector = curry(
  (vNode, selection) => thread(
    selection,
    classed(vNode.getClassList().join(' '), true),
    attr2('id', vNode.getId())
  )
);

export function gup(parent, nodeData, vNode) {
  const selection = thread(
    parent,
    selectAll(vNode.getSelector()),
    data(nodeData)
  );

  const enterSelection = thread(
    selection,
    enter,
    append(vNode.getTagName()),
    ensureSelector(vNode),
    attr(vNode.getConstantAttributes()),
    text(vNode.getTextChildren().join(''))
  );

  attr(vNode.getBoundAttributes(), selection);

  vNode.getConstantChildren()
    .forEach((child) =>
      thread(enterSelection,
        append(child.getTagName()),
        attr(child.getConstantChildren())
      )
    );

  vNode.getBoundChildren()
    .forEach((child) => child(selection));

  // todo: remove should go after middlewares
  const exitSelection = exit(selection);
  remove(exitSelection);

  return {selection, enterSelection, exitSelection};
}

export const gup1 = (data, content) =>
  (selection) =>
    gup(selection, data, content);
