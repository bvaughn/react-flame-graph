const data = {
  name: 'root',
  value: 5,
  children: [
    {
      name: 'custom tooltip',
      value: 1,

      // Each node can specify a "tooltip" to be shown on hover.
      // By default, the node's "name" will be used for this.
      tooltip: 'Custom tooltip shown on hover',
    },
    {
      name: 'custom colors',

      // Each node can also provide a custom "backgroundColor" or text "color".
      backgroundColor: '#35f',
      color: '#fff',

      value: 3,
      children: [
        {
          name: 'leaf',
          value: 2
        }
      ]
    },
  ],
};