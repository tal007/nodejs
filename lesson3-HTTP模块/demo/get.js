var http = require("http");
var server = new http.Server();
console.log(server);


http.createServer((req,res) => {
    http.get("http://nodejs.org/dist/index.json",(res) => {
        console.log(res)      
    })
    res.end()
}).listen(9000, "127.0.0.1");


