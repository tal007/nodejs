var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    
    fs.mkdir("./midrk-create",(err) => {
        if ( err ) {
            throw new Error(err)
        }
    })

    res.end()

}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
