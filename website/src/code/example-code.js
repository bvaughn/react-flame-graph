import { FlameGraph } from 'react-flame-graph';

<FlameGraph
  data={data}
  height={200}
  width={400}
  onChange={node => {
    console.log(`"${node.name}" focused`);
  }}
/>