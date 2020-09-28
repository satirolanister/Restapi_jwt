const http = require('http');
const {route} = require('./route/indexRoute')



const server = http.createServer((req, res) => {
    const { url, method } = req;

    console.log(`URL: ${url} - METHOD: ${method}`);

    route(method, url, req, res);

    
});

server.listen(3000);
console.log('server on port 3000');