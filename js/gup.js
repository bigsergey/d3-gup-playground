import {createVNode} from './vnode';

export function gup(selection, data, vNode) {
  const _node = selection.selectAll(vNode.getSelector()).data(data);
  const _nodeEnter = _node.enter().append(vNode.getTagName());
  vNode.ensureSelector(_nodeEnter);
  _nodeEnter.attr(vNode.getStaticAttrs());
  _node.attr(vNode.getDynamicAttrs());

  vNode.getChildren().forEach((child) => child(_node));

  const _nodeExit = _node.exit();
  _nodeExit.remove();
}

export const gup1 = (data, content) =>
  (selection) =>
    gup(selection, data, content);

export const div = createVNode('div');
export const span = createVNode('span');
