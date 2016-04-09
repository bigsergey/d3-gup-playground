import 'babel-polyfill';
import {selectAll} from 'd3';
import {gup, gup1} from './gup';
import {h} from './vnode';

const div = (selector, attrs, ...children) =>
  h(`div${selector}`, attrs, ...children);

const span = (selector, attrs, ...children) =>
  h(`span${selector}`, attrs, ...children);

const app = selectAll('#app');
const config = {color: 'blue'};

gup(app, [[2, 3, 4]],
  div('.chart2', {
      'data-test': config.color
    },
    span('.legend', {}, 'legenda'),
    gup1((d) => d, div('.bar', {
        textContent: (d) => `data: ${d}`,
        style: {
          'background-color': 'red',
          width: (d) => `${d * 100}px`
        }
      }
    ))
  )
);
