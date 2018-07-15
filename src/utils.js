/** @flow */

import type { ChartData, ChartNode, RawData } from './types';

import { backgroundColorGradient, colorGradient } from './constants';

const backgroundColorGradientLength = backgroundColorGradient.length;
const colorGradientLength = colorGradient.length;

function getNodeBackgroundColor(value, maxValue) {
  return backgroundColorGradient[
    Math.round(value / maxValue * (backgroundColorGradientLength - 1))
  ];
}

function getNodeColor(value, maxValue) {
  return colorGradient[
    Math.round(value / maxValue * (colorGradientLength - 1))
  ];
}

export function transformChartData(rawData: RawData): ChartData {
  let uidCounter = 0;

  const maxValue = rawData.value;

  const nodes = {};
  const levels = [];

  function convertNode(
    sourceNode: RawData,
    depth: number,
    leftOffset: number
  ): ChartNode {
    const { children, name, value } = sourceNode;

    // Add this node to the node-map and assign it a UID.
    const targetNode = (nodes[uidCounter] = {
      backgroundColor: getNodeBackgroundColor(value, maxValue),
      color: getNodeColor(value, maxValue),
      depth,
      left: leftOffset,
      name,
      width: value / maxValue,
    });

    // Register the node's depth within the graph.
    if (levels.length <= depth) {
      levels.push([]);
    }
    levels[depth].push(uidCounter);

    // Now that the current UID has been used, increment it.
    uidCounter++;

    // Process node children.
    if (Array.isArray(children)) {
      children.forEach(sourceChildNode => {
        const targetChildNode = convertNode(
          sourceChildNode,
          depth + 1,
          leftOffset
        );
        leftOffset += targetChildNode.width;
      });
    }

    return targetNode;
  }

  convertNode(rawData, 0, 0);

  return {
    height: levels.length,
    levels,
    nodes,
    root: 0,
  };
}
