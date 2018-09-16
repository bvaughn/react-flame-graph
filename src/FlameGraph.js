/** @flow */

import type { ChartData, ChartNode } from './types';

import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { defaultRowHeight, defaultTextHeight } from './constants';

type Props = {|
  data: ChartData,
  height: number,
  onChange?: (chartNode: ChartNode) => void,
  width: number,
  rowHeight: number,
  textHeight: number,
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
    (data, focusedNode, focusNode, width, rowHeight, textHeight) => ({
      data,
      focusedNode,
      focusNode,
      scale: value => value / focusedNode.width * width,
      rowHeight,
      textHeight,
    })
  );

  focusNode = (chartNode: ChartNode) => {
    this.setState(
      {
        focusedNode: chartNode,
      },
      () => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
          onChange(chartNode);
        }
      }
    );
  };

  render() {
    const { data, height, width, rowHeight, textHeight } = this.props;
    const { focusedNode } = this.state;

    const itemData = this.getItemData(
      data,
      focusedNode,
      this.focusNode,
      width,
      rowHeight || defaultRowHeight,
      textHeight || defaultTextHeight
    );

    return (
      <List
        height={height}
        innerTagName="svg"
        itemCount={data.height}
        itemData={itemData}
        itemSize={rowHeight || defaultRowHeight}
        width={width}
      >
        {ItemRenderer}
      </List>
    );
  }
}
