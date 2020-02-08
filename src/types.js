/** @flow */

export type RawData = {|
  backgroundColor?: string,
  color?: string,
  children?: Array<RawData>,
  id?: string,
  name: string,
  tooltip?: string,
  uid?: any,
  value: number,
|};

export type ChartNode = {|
  backgroundColor: string,
  color: string,
  depth: number,
  left: number,
  name: string,
  source: RawData,
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
  disableDefaultTooltips: boolean,
  focusedNode: ChartNode,
  focusNode: (chartNode: ChartNode, uid: any) => void,
  handleMouseEnter: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  handleMouseLeave: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  handleMouseMove: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  scale: (value: number) => number,
|};
