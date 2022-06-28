const http = require('http');
const moment = require('moment');

const server = http.createServer((req, res) => {
  const { url } = req;
  const data = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 21 },
    { name: 'Joe', age: 22 },
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (url === '/') {
    res.end(
      JSON.stringify({
        message: 'Hello World',
      })
    );
  }

  if (url === '/time') {
    res.end(
      JSON.stringify({
        time: moment().format('h:mm:ss a'),
      })
    );
  }

  if (url === '/date') {
    res.end(
      JSON.stringify({
        date: moment().format('MMMM Do YYYY'),
      })
    );
  }
  if (url === '/users') {
    res.end(JSON.stringify(data));
  }
});

server.listen(3000, () => {
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  console.log('Server is listening on port 3000');
});
