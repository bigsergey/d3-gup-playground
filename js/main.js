import 'babel-polyfill';
import {selectAll} from 'd3';
import {gup, gup1} from './gup';
import {h} from './vnode';

const app = selectAll('#app');
const config = {color: 'blue'};

gup(app, [[2, 3, 4]],
  h('div.chart2', {
      'data-test': config.color
    },
    h('span.legend', {}, 'legenda'),
    gup1((d) => d, h('div.bar', {
        textContent: (d) => `data: ${d}`,
        style: {
          'background-color': 'red',
          width: (d) => `${d * 100}px`
        }
      }
    ))
  )
);
