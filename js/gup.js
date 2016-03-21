import {h} from './vnode';

export function gup(parent, data, vNode) {
  const selection = parent.selectAll(vNode.getSelector()).data(data);
  const enterSelection = selection.enter().append(vNode.getTagName());
  vNode.ensureSelector(enterSelection);
  enterSelection.attr(vNode.getStaticAttrs());
  selection.attr(vNode.getDynamicAttrs());

  vNode.getStaticChildren()
    .forEach((child) =>
      enterSelection
        .append(child.getTagName())
        .attr(child.getStaticAttrs())
    );

  vNode.getBoundChildren()
    .forEach((child) => child(selection));

  const exitSelection = selection.exit();
  exitSelection.remove();

  return { selection, enterSelection, exitSelection };
}

export const gup1 = (data, content) =>
  (selection) =>
    gup(selection, data, content);
