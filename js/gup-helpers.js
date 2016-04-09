export const transition = (attr, {start, end}, duration) => ({
    enterTransform: (sel) =>
      sel.transition().duration(duration).attr(attr, end),
    exitTransform: (sel) =>
      sel.transition().duration(duration).attr(attr, start)});

export const call = (fn, ...attrs) =>
  (selection) =>
    selection.call(fn, ...attrs);
