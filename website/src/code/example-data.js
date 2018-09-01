const data = {
  name: 'foo',
  value: 5,
  children: [
    {
      name: 'bar',
      value: 1,

      // Each node can specify a "tooltip" to be shown on hover.
      // By default, the node's "name" will be used for this.
      tooltip: 'I am a custom tooltip',

      // Each node can also provide a custom "backgroundColor"
      // or text "color".
      backgroundColor: '#EF9A9A'
    },
    {
      name: 'baz',
      value: 3,
      children: [
        {
          name: 'qux',
          value: 2
        }
      ]
    },
  ],
};