/** @flow */

import type { ItemData } from './types';

import React, { PureComponent } from 'react';
import LabeledRect from './LabeledRect';
import { minWidthToDisplay, rowHeight } from './constants';

type Props = {|
  data: ItemData,
  index: number,
  style: Object,
|};

// Extend PureComponent to avoid rendering more than once per row.
// This isn't always important,
// But in this case it is because these rows are somewhat expensive.
export default class ItemRenderer extends PureComponent<Props, void> {
  render() {
    const { data: itemData, index, style } = this.props;

    const { data, focusedNode, scale } = itemData;

    const uids = data.levels[index];
    const focusedNodeLeft = scale(focusedNode.left);
    const focusedNodeWidth = scale(focusedNode.width);

    // List items are absolutely positioned using the CSS "top" attribute.
    // The "left" value will always be 0.
    // Since height is fixed, and width is based on the node's duration,
    // We can ignore those values as well.
    const top = parseInt(style.top, 10);

    return uids.map(uid => {
      const node = data.nodes[uid];
      const nodeLeft = scale(node.left);
      const nodeWidth = scale(node.width);

      // Filter out nodes that are too small to see or click.
      // This also helps render large trees faster.
      if (nodeWidth < minWidthToDisplay) {
        return null;
      }

      // Filter out nodes that are outside of the horizontal window.
      if (
        nodeLeft + nodeWidth < focusedNodeLeft ||
        nodeLeft > focusedNodeLeft + focusedNodeWidth
      ) {
        return null;
      }

      return (
        <LabeledRect
          backgroundColor={node.backgroundColor}
          color={node.color}
          height={rowHeight}
          isDimmed={index < focusedNode.depth}
          key={uid}
          label={node.name}
          onClick={() => itemData.focusNode(node)}
          width={nodeWidth}
          x={nodeLeft - focusedNodeLeft}
          y={top}
        />
      );
    });
  }
}
