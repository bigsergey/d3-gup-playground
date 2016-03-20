import 'babel-polyfill';
import {selectAll} from 'd3';
import {gup, gup1, div, span} from './gup';

const app = selectAll('#app');
const config = {color: 'red'};

gup(app, [[1, 2, 3, 4]],
  div('.chart', {
    'data-test': config.color
  }, gup1((d) => d, span('.bar', {
      text: (d) => `data: ${d}`
    }
  ))));

