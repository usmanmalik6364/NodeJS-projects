const http = require ('http');
const routes = require('./routes');
//event driven architecture
const server = http.createServer (routes);
server.listen (3000);
