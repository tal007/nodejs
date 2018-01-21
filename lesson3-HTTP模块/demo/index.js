var http = require("http");
var url = require("url");


// console.log(http.STATUS_CODES);

// "Moved Permanently"
// console.log(http.STATUS_CODES["301"]);

/* http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
    res.write("你好世界！");
    res.end()
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    
}).listen(9000, "127.0.0.1"); */

/* http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
    res.write("你好世界！");
    req.addListener("end",(res)=>{
        console.log(res)
    })
    res.end()
    
}).listen(9000, "127.0.0.1"); */

http.createServer((req,res) => {
  var content = "";

  req.addListener('data', (chunk) => {
    content += chunk;
  });

  req.addListener('end', () => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent: " + content);
    res.end();
  });
    
}).listen(9000, "127.0.0.1");