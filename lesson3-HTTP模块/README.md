HTTP模块主要是用于处理服务器请求。`HTTP`的API是的非常底层的。

# http.STATUS_CODES
`http.STATUS_CODES`是一个对象，属性名都是状态码，属性值都是次状态码的简单解释。

一共有以下几种状态码：
```json
{ 
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Unordered Collection',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '509': 'Bandwidth Limit Exceeded',
  '510': 'Not Extended',
  '511': 'Network Authentication Required' 
}
```

可以个此属性传递一个参数
```javascript
// "Moved Permanently"
console.log(http.STATUS_CODES["301"]);
```
返回的就是这个简单的解释。

# 用法
## 处理`GET`请求
`HTTP`用于快速搭建HTTP服务。
```JavaScript
var http = require("http");

http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
    res.write("你好世界！");
    res.end()
}).listen(9000, "127.0.0.1");
```
上面的第一行代码`var http = require("http");`表示加载`http`模块。接下来调用了此模块的`createServer`方法创建一个服务器实例。

`createServer`方法接收一个函数作为参数，该函数的`req`参数是一个对象，表示客户端的HTTP请求；`res`参数也是一个对象，表示服务器端的HTTP回应。`res.writeHead`方法用来写入HTTP回应的头信息；`res.end`方法用来写入HTTP回应的具体内容，以及回应完成后关闭本次对话，**`end`方法不可省略**。最后的`listen(9000)`表示启动服务器实例，监听本机的9000端口。

将此文件保存在`demo`文件夹下面，并命名为`index.js`。运行可以使用node命令：`node demo/index.js`，也可以在`package,json`中配置。
```json
"scripts": {
    "start": "node ./demo/index.js"
}
```
使用`npm start`可以达到同样的效果。

## request 对象
`createServer` 方法的回调函数的第一个参数是一个 `request` 对象，拥有以下属性。
- `url`：发出请求的网址。注意会有`/favicon.ico`的请求。
- `method`：HTTP请求的方法。默认是 `GET`
- `headers`：HTTP请求的所以HTTP请求头信息。

`request`的`setEncoding`方法可以用于设置请求的编码
```javascript
request.setEncoding("utf8")
```

`request`的`addListener`方法用于为请求添加监听事件的回调函数。
```javascript
http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
    res.write("你好世界！");
    req.addListener("end",(res)=>{
        console.log(res)  // undefined
    })
    res.end()
    
}).listen(9000, "127.0.0.1");
```

## 处理异步操作
当遇到异步操作的时候，会先处理后面的请求，等到当前请求有了结果以后，再返回结果。

## 处理`POST`请求
当客户端采用`POST`方法发送数据的时候，服务器可以对`data`与`end`两个事件设置监听函数。
```javascript
var http = require('http');

http.createServer((req, res) => {
  var content = "";

  // 也可以使用前面说的 addListener 代替 on
  req.on('data', (chunk) => {
    content += chunk;
  });

  req.on('end', () => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent: " + content);
    res.end();
  });

}).listen(8080);
```

`data事件`会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。

`end事件`则是在所有数据接收完成后触发。

html页面的代码如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="http://127.0.0.1:9000" method="post">
        用户名：<input type="text" name="username">
        年龄：<input type="number" name="age">
        男：<input type="radio" name="sex" value="男">
        女：<input type="radio" name="sex" value="女">
        <input type="submit" value="提交">
    </form>
</body>
</html>
```

# 发出请求
## http.get(options[, callback])
`get()`方法用于发出get请求。此方法接收两个参数
- url：第一个参数是一个地址，可以是对象的形式，比如`{host: "www.lytblog.com",path: '/tag/nodejs'}`.也可以是一个url字符串，比如`"http://www.lytblog.com/tag/nodejs"`
- callback：一个可选参数，请求成功处理的事情。虽然是可选，但是一般都需要。

## http.request(options[, callback])
`request` 方法用于发出HTTP请求，它的使用格式如下。

request方法的`options`参数，可以是一个对象，也可以是一个字符串。如果是字符串，就表示这是一个URL，Node内部就会自动调用`url.parse()`，处理这个参数。

- protocol `<string>` 使用的协议。默认为 http:。
- host `<string>` 请求发送至的服务器的域名或 IP 地址。默认为 localhost。
- hostname `<string>` host 的别名。为了支持 url.parse()，hostname 优先于 host。
- family `<number>` 当解析 host 和 hostname 时使用的 IP 地址族。 有效值是 4 或 6。当未指定时，则同时使用 IP v4 和 v6。
- port `<number>` 远程服务器的端口。默认为 80。
- localAddress `<string>` 为网络连接绑定的本地接口。
- socketPath `<string>` Unix 域 Socket（使用 host:port 或 socketPath）。
- method `<string>` 指定 HTTP 请求方法的字符串。默认为 'GET'。
- path `<string>` 请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
- headers `<Object>` 包含请求头的对象。
- auth `<string>` 基本身份验证，如 'user:password' 用来计算 Authorization 请求头。
- agent `<http.Agent>` | `<boolean>` 控制 Agent 的行为。 可能的值有：
- undefined (默认): 对该主机和端口使用 http.globalAgent。
- Agent 对象：显式地使用传入的 Agent。
- false: 创建一个新的使用默认值的 Agent。
- createConnection `<Function> `当不使用 agent 选项时，为请求创建一个 socket 或流。 这可以用于避免仅仅创建一个自定义的 Agent 类来覆盖默认的 createConnection 函数。详见 agent.createConnection()。
- timeout `<number>`: 指定 socket 超时的毫秒数。 它设置了 socket 等待连接的超时时间。

request方法的`callback`参数是可选的，在response事件发生时触发，而且只触发一次。

`http.request()`返回一个`http.ClientRequest`类的实例。它是一个可写数据流，如果你想通过POST方法发送一个文件，可以将文件写入这个`ClientRequest`对象。

# Server()
`Server` 方法用于新建一个服务器实例。
```JavaScript
var server = new http.Server();
server.listen(9000)
```
这与使用`createServer`方法差别不大。

`listen`方法用于启动服务器，可以接收多种参数
```javascript
var server = new http.Server();

// 端口
server.listen(9000);

// 端口，主机
server.listen(9000, 'localhost');

// 对象
server.listen({
  port: 9000,
  host: 'localhost',
})
```

# 搭建HTTPS服务器
搭建HTTPs服务器需要有SSL证书。对于向公众提供服务的网站，SSL证书需要向证书颁发机构购买；对于自用的网站，可以自制。

自制SSL证书需要 [OpenSSL](https://www.openssl.org/source/) ，具体命令如下。
```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```
上面的命令生成两个文件：ert.pem（证书文件）和 key.pem（私钥文件）。有了这两个文件，就可以运行HTTPs服务器了。

Node.js提供一个https模块，专门用于处理加密访问。
```javascript
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);
```
HTTPs服务器与HTTP服务器的最大区别，就是createServer方法多了一个options参数。运行以后，就可以测试是否能够正常访问。

# 模块属性
HTTP模块两个属性：
- headers：HTTP请求的头信息
- url：请求的路径

# 模块方法
1. HTTP模块的常用的方法
- createServer()：创建服务器实例


2. 服务器实例方法
- listen()：服务器实例的方法，启动服务器监听指定端口。需要使用上面的方法创建实例后在使用

3. HTTP回应方法
- setHeader(key,value)：设置HTTP头信息，可以是一个对象。
- write(str)：指定HTTP回应的内容
- end()：发送HTTP回应。此方法必须写，否则会一直处于请求状态，浏览器无法收到回应。