/** @flow */

import type { ChartData, ChartNode, RawData } from './types';

import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { rowHeight } from './constants';

type Props = {|
  data: ChartData,
  height: number,
  onChange?: (chartNode: ChartNode, uid: any) => void,
  onMouseOut?: (e: any, node: RawData) => void,
  onMouseOver?: (e: any, node: RawData) => void,
  width: number,
|};

type State = {|
  focusedNode: ChartNode,
|};

export default class FlameGraph extends PureComponent<Props, State> {
  // Select the root node by default.
  state: State = {
    focusedNode: this.props.data.nodes[this.props.data.root],
  };

  // Shared context between the App and individual List item renderers.
  // Memoize this wrapper object to avoid breaking PureComponent's sCU.
  // Attach the memoized function to the instance,
  // So that multiple instances will maintain their own memoized cache.
  getItemData = memoize(
    (data, focusedNode, focusNode, onMouseOut, onMouseOver, width) => ({
      data,
      focusedNode,
      focusNode,
      scale: value => value / focusedNode.width * width,
      onMouseOut,
      onMouseOver,
    })
  );

  focusNode = (uid: any) => {
    const { nodes } = this.props.data;
    const chartNode = nodes[uid];
    this.setState(
      {
        focusedNode: chartNode,
      },
      () => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
          onChange(chartNode, uid);
        }
      }
    );
  };

  render() {
    const { data, height, onMouseOut, onMouseOver, width } = this.props;
    const { focusedNode } = this.state;

    const itemData = this.getItemData(
      data,
      focusedNode,
      this.focusNode,
      onMouseOut,
      onMouseOver,
      width
    );

    return (
      <List
        height={height}
        innerTagName="svg"
        itemCount={data.height}
        itemData={itemData}
        itemSize={rowHeight}
        width={width}
      >
        {ItemRenderer}
      </List>
    );
  }
}
