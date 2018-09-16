/** @flow */

import React from 'react';
import { minWidthToDisplayText } from './constants';

import styles from './LabeledRect.css';

type Props = {|
  backgroundColor: string,
  color: string,
  height: number,
  textHeight: number,
  isDimmed?: boolean,
  label: string,
  onClick: Function,
  tooltip?: string,
  width: number,
  x: number,
  y: number,
|};

const LabeledRect = ({
  backgroundColor,
  color,
  height,
  textHeight,
  isDimmed = false,
  label,
  onClick,
  tooltip,
  width,
  x,
  y,
}: Props) => (
  <g className={styles.g} transform={`translate(${x},${y})`}>
    <title>{tooltip != null ? tooltip : label}</title>
    <rect width={width} height={height} fill="white" className={styles.rect} />
    <rect
      width={width}
      height={height}
      fill={backgroundColor}
      onClick={onClick}
      className={styles.rect}
      style={{
        opacity: isDimmed ? 0.5 : 1,
      }}
    />
    {width >= minWidthToDisplayText && (
      <foreignObject
        width={width}
        height={height}
        className={styles.foreignObject}
        style={{
          opacity: isDimmed ? 0.75 : 1,
          paddingLeft: x < 0 ? -x : 0,
        }}
        y={height < textHeight ? -textHeight : 0}
      >
        <div className={styles.div} style={{ color }}>
          {label}
        </div>
      </foreignObject>
    )}
  </g>
);

export default LabeledRect;
