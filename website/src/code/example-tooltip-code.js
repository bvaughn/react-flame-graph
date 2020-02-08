<FlameGraph
  data={data}
  disableDefaultTooltips={true}
  onMouseOver={(event, itemData) => {
    // event is the React event

    // itemData belongs to the hovered flamegraph node;
    // it is a node of the larger "data" object passed to FlameGraph.
  }}
  onMouseOut={(event, itemData) => {
    // ...
  }}
  onMouseMove={(event, itemData) => {
    // ...
  }}
  {...rest}
/>