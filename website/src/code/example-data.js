const data = {
  name: 'foo',
  value: 5,
  children: [
    {
      name: 'bar',
      value: 1,

      // Each node can also specify a "tooltip" to be shown on hover.
      // By default, the node's "name" will be used for this.
      tooltip: 'I am a custom tooltip'
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