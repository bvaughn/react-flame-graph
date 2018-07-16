/** @flow */

import React from 'react';
import { minWidthToDisplayText } from './constants';

import styles from './LabeledRect.css';

type Props = {|
  backgroundColor: string,
  color: string,
  containerWidth: number,
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
  containerWidth,
  height,
  isDimmed = false,
  label,
  onClick,
  width,
  x,
  y,
}: Props) => {
  // Aligning rects with the left border simplifies horizontal text alignment.
  // Otherwise, we would have to add left padding to ensure the text remains visible,
  // But width and padding animations would not line up, since their deltas would differ.
  // This approach is simpler and looks visually consistent.
  if (x < 0) {
    width += x;
    x = 0;
  }

  // Fake a border by shrinking the rect slightly.
  height -= 1;
  width = Math.min(width, containerWidth) - 1;

  // Fake opacity dim for nodes above the selected ones.
  // Using a filter prevents text from bleeding into other texts during animation.
  // See GitHub issue 1.
  const filter = isDimmed ? 'brightness(115%) grayscale(50%)' : undefined;

  return (
    <div
      className={styles.div}
      onClick={onClick}
      style={{
        backgroundColor,
        color,
        height,
        filter,
        transform: `translate(${x}px, ${y}px)`,
        width,
      }}
      title={label}
    >
      &nbsp;{width >= minWidthToDisplayText ? label : ''}
    </div>
  );
};

export default LabeledRect;
