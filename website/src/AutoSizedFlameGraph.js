/** @flow */

import React, { Fragment, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FlameGraph } from 'react-flame-graph';
import useSmartTooltip from './useSmartTooltip';

import styles from './AutoSizedFlameGraph.module.css';

function getMousePos(relativeContainer, mouseEvent: SyntheticMouseEvent<*>) {
  if (relativeContainer !== null) {
    const rect = relativeContainer.getBoundingClientRect();
    const mouseX = mouseEvent.clientX - rect.left;
    const mouseY = mouseEvent.clientY - rect.top;

    return { mouseX, mouseY };
  } else {
    return { mouseX: 0, mouseY: 0 };
  }
}

export default function AutoSizedFlameGraph({
  data,
  enableTooltips,
  height,
}: any) {
  const containerRef = useRef(null);
  const [tooltipState, setTooltipState] = useState(null);

  const onMouseOver = enableTooltips
    ? (event, data) => {
        setTooltipState({
          text: data.name,
          ...getMousePos(containerRef.current, event),
        });
      }
    : undefined;

  const onMouseMove = enableTooltips
    ? (event, data) => {
        setTooltipState({
          text: data.name,
          ...getMousePos(containerRef.current, event),
        });
      }
    : undefined;

  const onMouseOut = enableTooltips
    ? (event, data) => {
        setTooltipState(null);
      }
    : undefined;

  const tooltipRef = useSmartTooltip({
    mouseX: tooltipState === null ? 0 : tooltipState.mouseX,
    mouseY: tooltipState === null ? 0 : tooltipState.mouseY,
  });

  return (
    <div
      style={{
        height,
        backgroundColor: '#fff',
        padding: '20px',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
      }}
      ref={containerRef}
    >
      <AutoSizer>
        {({ height: autoSizerHeight, width }) => (
          <Fragment>
            <FlameGraph
              data={data}
              disableDefaultTooltips={enableTooltips === true}
              height={autoSizerHeight}
              width={width}
              onMouseMove={onMouseMove}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            />
            {tooltipState !== null && (
              <div ref={tooltipRef} className={styles.Tooltip}>
                {tooltipState.text}
              </div>
            )}
          </Fragment>
        )}
      </AutoSizer>
    </div>
  );
}
