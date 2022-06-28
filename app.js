const http = require('http');
const moment = require('moment');

const serverFunction = (req, res) => {
  res.end('Hello World !');
};

const server = http.createServer(serverFunction);

server.listen(3000, () => {
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  console.log('Server is listening on port 3000');
});
