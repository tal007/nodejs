var http = require("http");
var querystring = require("querystring");

http.createServer((req, res) => {
    res.writeHead("200", {"Content-Type": "text/html;charset=utf8"})
    var str = "foo=bar&abc=xyz";
    var strToJson = querystring.parse(str)
    console.log(strToJson);
    
    res.end()
}).listen(3000, "127.0.0.1")