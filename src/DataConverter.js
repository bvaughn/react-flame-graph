/** @flow */

import type { RawData } from './types';

import React, { PureComponent } from 'react';
import memoize from 'memoize-one';
import FlameGraph from './FlameGraph';
import { transformChartData } from './utils';

type Props = {|
  data: RawData,
  height: number,
  width: number,
|};

// Wrapper component responsible for converting raw chart data into the format required by FlameGraph.
// Doing this conversion as a separate component has two benefits:
// 1) It simplifies FlameGraph (slightly)
// 2) It allows React's async rendering mode to more easily split up the work if this conversion is slow.
export default class FlameGraphProcessor extends PureComponent<Props, void> {
  // Convert raw chart data to the format required by the flame graph.
  // Memoize this wrapper object for performance and to avoid breaking PureComponent's sCU.
  // Attach the memoized function to the instance,
  // So that multiple instances will maintain their own memoized cache.
  getChartdata = memoize(rawData => transformChartData(rawData));

  render() {
    const { data: rawData, ...rest } = this.props;

    const chartData = this.getChartdata(rawData);

    return <FlameGraph data={chartData} {...rest} />;
  }
}
