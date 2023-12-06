/** @flow */

import React, { Fragment } from 'react';
import AutoSizedFlameGraph from './AutoSizedFlameGraph.js';
import ChartDataLoader from './ChartDataLoader.js';
import CodeBlock from './CodeBlock.js';

import EXAMPLE_CODE from './code/example-code.js';
import EXAMPLE_DATA from './code/example-data.js';
import EXAMPLE_INSTALLATION from './code/example-installation.js';
import EXAMPLE_TOOLTIP_CODE from './code/example-tooltip-code.js';

const simpleData = {
  name: 'foo',
  value: 5,
  children: [
    {
      name: 'custom tooltip',
      value: 1,
      tooltip: 'Custom tooltip shown on hover',
    },
    {
      name: 'custom background color',
      value: 3,
      backgroundColor: '#35f',
      color: '#fff',
      children: [
        {
          name: 'leaf',
          value: 2,
        },
      ],
    },
  ],
};

export default function App() {
  return (
    <Fragment>
      <h1>
        <a href="https://github.com/bvaughn/react-flame-graph">
          react-flame-graph
        </a>
      </h1>
      <p>A React component for visualizing profiling data.</p>
      <h2>Demo</h2>
      <p>
        Click a row in the chart below to zoom in or out. Scroll up or down to
        see more of the chart.
      </p>
      <ChartDataLoader height={240} url="/live.json" />
      <h2>Installation</h2>
      <CodeBlock value={EXAMPLE_INSTALLATION} />
      <h2>Usage</h2>
      <p>Creating a flame graph can be simple!</p>
      <p>
        First, define the data. Flame graphs are just a tree of "nodes". Each
        node must have a <code>name</code> (string) and a <code>value</code>{' '}
        (number). Descendents should be nested within a <code>children</code>{' '}
        array.
      </p>
      <p>
        Optionally, nodes may define a custom tooltip (string),{' '}
        <code>color</code> (string), and <code>backgroundColor</code> (string).
      </p>
      <CodeBlock value={EXAMPLE_DATA} />
      <p>
        Next, pass the data to the <code>FlameGraph</code> component, along with
        a width and height. You can also provide an <code>onChange</code>{' '}
        callback to be notified when a new node is selected.
      </p>
      <CodeBlock value={EXAMPLE_CODE} />
      <p>The example data above will display the following flame graph:</p>
      <AutoSizedFlameGraph data={simpleData} height={105} disableScroll />
      <h2>Custom tooltips</h2>
      <p>
        Custom tooltips can be implemented by passing <code>onMouseOver</code>,{' '}
        <code>onMouseOut</code>, and <code>onMouseMOve</code> props to the
        flamegraph component. These props should be defined as functions which
        receive the mouse event as the first parameter and the related node as
        the second parameter. It is also advised to set{' '}
        <code>disableDefaultTooltips</code> when providing your own tooltips.
      </p>
      <CodeBlock value={EXAMPLE_TOOLTIP_CODE} />
      <p>Here is an example of a basic tooltip:</p>
      <AutoSizedFlameGraph
        data={simpleData}
        disableDefaultTooltips={true}
        height={105}
        disableScroll
        enableTooltips={true}
      />
    </Fragment>
  );
}
