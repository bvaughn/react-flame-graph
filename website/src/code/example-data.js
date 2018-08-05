const data = {
  name: 'foo',
  value: 5,
  children: [
    {
      name: 'bar',
      value: 1,
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