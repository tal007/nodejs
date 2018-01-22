var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    // 因为异步所以后执行 console
    fs.exists("./a.js",(bool) => {
        console.log(bool)  // false
    })
    
    console.log(fs.existsSync("./a.js") ? "yes" : "no")

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
