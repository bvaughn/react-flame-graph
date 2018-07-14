/** @flow */

import React from 'react';
import {
  minWidthToDisplay,
  minWidthToDisplayText,
  textHeight,
} from './constants';

type Props = {|
  backgroundColor: string,
  color: string,
  height: number,
  isDimmed?: boolean,
  label: string,
  onClick: Function,
  width: number,
  x: number,
  y: number,
|};

const LabeledRect = ({
  backgroundColor,
  color,
  height,
  isDimmed = false,
  label,
  onClick,
  width,
  x,
  y,
}: Props) => (
  <g
    style={{
      transition: 'all ease-in-out 250ms',
    }}
    transform={`translate(${x},${y})`}
  >
    <title>{label}</title>
    <rect
      width={width}
      height={height}
      fill={backgroundColor}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        opacity: isDimmed ? 0.5 : 1,
        stroke: '#fff',
        transition: 'all ease-in-out 250ms',
      }}
    />
    {width >= minWidthToDisplayText && (
      <foreignObject
        width={width}
        height={height}
        style={{
          transition: 'all ease-in-out 250ms',
          opacity: isDimmed ? 0.75 : 1,
          display: width < minWidthToDisplay ? 'none' : 'block',
          paddingLeft: x < 0 ? -x : 0,
          pointerEvents: 'none',
        }}
        y={height < textHeight ? -textHeight : 0}
      >
        <div
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontSize: '12px',
            fontFamily: 'sans-serif',
            marginLeft: '4px',
            marginRight: '4px',
            lineHeight: '1.5',
            padding: '0 0 0',
            fontWeight: '400',
            color: color,
            textAlign: 'left',
            transition: 'all ease-in-out 250ms',
            userSelect: 'none',
          }}
        >
          {label}
        </div>
      </foreignObject>
    )}
  </g>
);

export default LabeledRect;
