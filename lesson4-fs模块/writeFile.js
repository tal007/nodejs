var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    
    fs.writeFile("./readFile.txt","读取文件ReadFile",(err, data) => {
        if ( err ) {
            throw new Error(err)
        }
        console.log(data);
        
    })

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
