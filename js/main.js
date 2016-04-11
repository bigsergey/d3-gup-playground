import 'babel-polyfill';
import {selectAll} from 'd3';
import {gup, bind} from './gup';
import {call, transition} from './gup-helpers';
import {div, span} from './gup-tags';
import {h} from './vnode';

const config = {color: 'blue'};

const barNode = div('.bar', {
  textContent: (d) => `data: ${d}`,
  style: {
    'background-color': 'red',
    width: (d) => `${d * 100}px`
  }
});

var bar = bind((d) => d, barNode);

var chartNode = div(
  '.chart2',
  {'data-test': config.color},
  span('.legend', {}, 'legenda'),
  bar
);

const chart = bind(
  [[2, 3, 4]],
  chartNode,
  transition('fill', {start: 'red', end: 'blue'}, 1000) );

gup(selectAll('#app'), chart);
