import fs from 'fs';
import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  // Solution 1 - bad, we have to wait until the whole file load
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Solution 2: streams - this solution causes problems called back pressure - it means that
  // we recived redable data faster, and writable data can't handle to send it on time, because writable network works slowly
  //   const readable = fs.createReadStream('test-file.txt');
  //   // listen to event data
  //   readable.on('data', (chunk) => {
  //     // response is already writable stream so we can pass chunk here to stream response in chunks
  //     // so when the part of data is read and ready we can send chunk, and again
  //     res.write(chunk);
  //   });
  //   // we are listening to read whole file (when the stream is finished)
  //   readable.on('end', () => {
  //     // this is a signal that no mora data will be write to this stream
  //     res.end();
  //   });
  //   // handling error
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found');
  //   });
  // Solution 3 - the final one uses pipe() - allow us to pipe the output of readable stream right into the input of a readable stream
  // this is fixing the problem of back pressure
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writableDestination)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
