import fs from 'fs';
import crypto from 'crypto';

const start = Date.now();
// by default we have 4 threads - here we can set number of thread in threadpool
// process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log('Timer 1 is finieshed'), 0);
setImmediate(() => console.log('Set Immediate 1 is finished'));

fs.readFile('test-file.txt', () => {
  console.log('First I/O finished');

  setTimeout(() => console.log('Timer 2 is finieshed'), 0);
  setTimeout(() => console.log('Timer 3 is finieshed'), 3000);
  setImmediate(() => console.log('Set Immediate 2 is finished'));
  process.nextTick(() => console.log('process.nextTick'));

  // event loop ofload to threadpool
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted 1');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted 2');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted 3');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted 4');
  });
  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'Password encrypted 5');
  // });
});

console.log('TOP LEVEL CODE');
