var http = require("http");
var fs = require("fs");

http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    fs.watchFile("./watchfile.txt", (curr, prev)=>{
        console.log(curr);
        console.log(prev);
        
        res.write(`当前的内容是${curr.mtime}`)
        res.write(`之前的内容是${prev.mtime}`)
    })
}).listen(3000, "127.0.0.1")