var http = require("http");
var url = require("url");

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
    var resolveEnd = url.resolve('http://example.com/', '/one');
    res.end(resolveEnd);
}).listen(3000, "127.0.0.1")

// 可以看的页面上出现了一个 http://example.com/one 上面的两个地址拼在一起了