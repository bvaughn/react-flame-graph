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
