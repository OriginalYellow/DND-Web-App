const Flow = require('oja').Flow;

const base = new Flow();
base.define('foo', 'bar');
const flow = new Flow(base);
flow.consume('foo', (foo) => {
  console.log(foo); // prints bar
});