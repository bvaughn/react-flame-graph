/** @flow */

import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FlameGraph } from 'react-flame-graph';

export default function AutoSizedFlameGraph({ data, height }: any) {
  return (
    <div
      style={{
        height,
        backgroundColor: '#fff',
        padding: '20px',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
      }}
    >
      <AutoSizer>
        {({ height: autoSizerHeight, width }) => (
          <FlameGraph data={data} height={autoSizerHeight} width={width} />
        )}
      </AutoSizer>
    </div>
  );
}
