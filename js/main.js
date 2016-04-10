import 'babel-polyfill';
import {selectAll} from 'd3';
import {gup, bind} from './gup';
import {call, transition} from './gup-helpers';
import {h} from './vnode';

const div = (selector, attrs, ...children) =>
  h(`div${selector}`, attrs, ...children);

const span = (selector, attrs, ...children) =>
  h(`span${selector}`, attrs, ...children);

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
