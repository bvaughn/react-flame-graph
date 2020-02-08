/** @flow */

import type { ChartData, ChartNode, ItemData, RawData } from './types';

import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { rowHeight } from './constants';

type Props = {|
  data: ChartData,
  disableDefaultTooltips?: boolean,
  height: number,
  onChange?: (chartNode: ChartNode, uid: any) => void,
  onMouseMove?: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  onMouseOut?: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  onMouseOver?: (event: SyntheticMouseEvent<*>, node: RawData) => void,
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
    (
      data: ChartData,
      disableDefaultTooltips: boolean,
      focusedNode: ChartNode,
      focusNode: (uid: any) => void,
      handleMouseEnter: (event: SyntheticMouseEvent<*>, node: RawData) => void,
      handleMouseLeave: (event: SyntheticMouseEvent<*>, node: RawData) => void,
      handleMouseMove: (event: SyntheticMouseEvent<*>, node: RawData) => void,
      width: number
    ) =>
      ({
        data,
        disableDefaultTooltips,
        focusedNode,
        focusNode,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseMove,
        scale: value => (value / focusedNode.width) * width,
      }: ItemData)
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

  handleMouseEnter = (event: SyntheticMouseEvent<*>, rawData: RawData) => {
    const { onMouseOver } = this.props;
    if (typeof onMouseOver === 'function') {
      onMouseOver(event, rawData);
    }
  };

  handleMouseLeave = (event: SyntheticMouseEvent<*>, rawData: RawData) => {
    const { onMouseOut } = this.props;
    if (typeof onMouseOut === 'function') {
      onMouseOut(event, rawData);
    }
  };

  handleMouseMove = (event: SyntheticMouseEvent<*>, rawData: RawData) => {
    const { onMouseMove } = this.props;
    if (typeof onMouseMove === 'function') {
      onMouseMove(event, rawData);
    }
  };

  render() {
    const { data, disableDefaultTooltips, height, width } = this.props;
    const { focusedNode } = this.state;

    const itemData = this.getItemData(
      data,
      !!disableDefaultTooltips,
      focusedNode,
      this.focusNode,
      this.handleMouseEnter,
      this.handleMouseLeave,
      this.handleMouseMove,
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
