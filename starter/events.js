import EventEmmiter from 'events';
import http from 'http';

// OBSERVER PATTERN
// -------------- custom emmiter example -------------
// new instance of emitter
// const myEmmiter = new EventEmmiter();

// node modules inherit from EventEmmiter class - for example http
class Sales extends EventEmmiter {
  constructor() {
    super();
  }
}
const myEmmiter = new Sales();

// listen to event
myEmmiter.on('newSale', () => {
  console.log('New sale has just appered!');
});
myEmmiter.on('newSale', () => {
  console.log('We can see second new sale!');
});
myEmmiter.on('newSale', (stock) => {
  console.log(`There are ${stock} items left in stock`);
});

// emitting event
myEmmiter.emit('newSale', 12);

// -------------- http example -------------
const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request recived!');
  console.log(req.url);
  res.end('Request recived!');
});

server.on('request', (req, res) => {
  console.log('Another request recived!');
});

server.on('close', () => {
  console.log('Server closed!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...');
});

// server is not closing because event loop is still waiting for incoming  I/O
