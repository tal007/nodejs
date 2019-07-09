// import http from "http";
// import fs from "fs";
var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    var txt = fs.readFileSync("./1.txt","utf8");
    console.log(`txt${txt}`);
    
    fs.readFile("./1.txt",(err,data) => {
        if (err) {
            throw new Error(err)
        }
        console.log(data.toString());
    })

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
