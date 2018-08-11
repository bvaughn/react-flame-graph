/** @flow */

export type ChartNode = {|
  backgroundColor: string,
  color: string,
  depth: number,
  left: number,
  name: string,
  tooltip?: string,
  width: number,
|};

export type ChartData = {|
  height: number,
  levels: Array<Array<any>>,
  nodes: { [uid: any]: ChartNode },
  root: any,
|};

export type ItemData = {|
  data: ChartData,
  focusedNode: ChartNode,
  focusNode: (chartNode: ChartNode) => void,
  scale: (value: number) => number,
|};

export type RawData = {|
  children?: Array<RawData>,
  name: string,
  tooltip?: string,
  value: number,
|};
