import fs from 'fs';

setTimeout(() => console.log('Timer 1 is finieshed'), 0);
setImmediate(() => console.log('Set Immediate 1 is finished'));

fs.readFile('test-file.txt', () => {
  console.log('First I/O finished');

  setTimeout(() => console.log('Timer 2 is finieshed'), 0);
  setTimeout(() => console.log('Timer 3 is finieshed'), 3000);
  setImmediate(() => console.log('Set Immediate 2 is finished'));
});

console.log('TOP LEVEL CODE');
