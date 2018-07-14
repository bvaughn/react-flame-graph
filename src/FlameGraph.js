/** @flow */

import type { ChartData, ChartNode } from './types';

import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { rowHeight } from './constants';

type Props = {|
  data: ChartData,
  height: number,
  width: number,
|};

type State = {|
  focusedNode: ChartNode,
|};

export default class FlameGraph extends PureComponent<Props, State> {
  state: State = {
    focusedNode: this.props.data.nodes[this.props.data.root],
  };

  // Shared context between the App and individual List item renderers.
  // Memoize this wrapper object to avoid breaking PureComponent's sCU.
  // Attach the memoized function to the instance,
  // So that multiple instances will maintain their own memoized cache.
  getItemData = memoize((data, focusedNode, focusNode, width) => ({
    data,
    focusedNode,
    focusNode,
    scale: value => value / focusedNode.width * width,
  }));

  render() {
    const { data, height, width } = this.props;
    const { focusedNode } = this.state;

    return (
      <List
        containerTagName="svg"
        height={height}
        itemCount={data.height}
        itemData={this.getItemData(data, focusedNode, this.focusNode, width)}
        itemSize={rowHeight}
        width={width}
      >
        {ItemRenderer}
      </List>
    );
  }

  focusNode = (chartNode: ChartNode) =>
    this.setState({
      focusedNode: chartNode,
    });
}
