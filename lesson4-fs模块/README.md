FS模块也是nodejs中使用非常频繁的一个模块。这个模块提供了对`本地文件的读写能力`，是`filesystem`的缩写。此模块的几乎所有方法都提供异步与同步方法。加`Sync`的都是同步读取，**`同步方法没有回调函数`**。虽然拥有同步方法，但是还是最好用异步方法，因为同步操作时，只有前一个操作结束，才会开始后一个操作，如果某个操作特别耗时（常常发生在读写数据时），会导致整个程序停顿。

# readFile() 与 readFileSync()
`readFile`方法用于`异步`读取数据。
```javascript
var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    fs.readFile("./1.txt",(err,data) => {
        if (err) {
            throw new Error(err)
        }
        console.log(data);
    })

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
```
`readFile`有三个参数。

第一个参数是文件的路径。可以是结对路径也可以是相对路径，本例子使用相对路径。不过需要注意的是：如果是相对路径，这个路径是相对于当前进程所在的路径。而不是相对于当前脚本所在额路径。比如本例子中：
```
# 使用如下命令
G:\nodejs> node .\lesson4-fs模块\readFile.js
# 结果
Error: Error: ENOENT: no such file or directory, open 'G:\nodejs\1.txt'

# 使用以下命令
G:\nodejs\lesson4-fs模块> node .\readFile.js
# 结果
<Buffer ff fe d9 8f 2f 66 00 4e 2a 4e af 7e 87 65 2c 67 87 65 f6 4e 02 30 0d 00 0a 00>
<Buffer ff fe d9 8f 2f 66 00 4e 2a 4e af 7e 87 65 2c 67 87 65 f6 4e 02 30 0d 00 0a 00>
```
上面的路径是不同的，结果也不同。`G:\nodejs>`与`G:\nodejs\lesson4-fs模块>`就是两次的进程所在路径。路径可以使用`pwd`命令查看。也可以看看[简单的linux命令](http://www.lytblog.com/2017/12/05/577/.html)。

第二个参数是`文件编码`。可用文件编码包括`ascii`、`utf8`和`“ase64`。如果没有指定编码则放回二进制数据（`Buffer`）。

`readFile`的第三个参数是一个回调函数。此函数的第一个参数是一个`err`错误对象，第二个参数是一个表示文件内容额`Buffer`实例。如果需要将此实例转化为字符串可以使用`toString`方法。

`readFileSync`方法用于同步读取文件。返回一个`字符串`。此方法也支持两个参数。第一个参数仍然是文件路径。

与`readFile`方法不用的是，此方法的第二个参数表示配置一个对象，也可以是一个表示文本编码的字符串。默认的配置对象是`{encoding: null, flag: "r"}`。`encoding`表示文件编码，`flag`表是读取方式，`r`为只读。如果不指定第二个参数，那么与`readFile`方法一样返回一个`Buffer`，否则返回一个字符串。
```javascript
var txt = fs.readFileSync("./1.txt","utf8");
console.log(`txt${txt}`);
```

# writeFile() 与 writeFileSync()
`writeFile`方法是异步写入文件。接收四个参数：
- 写入的文件路径
- 写入的字符串
- 可选：表示写入字符串的编码，默认`utf8`。
- 回到函数。只有一个参数`err`。

```javascript
var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    
    fs.writeFile("./readFile.txt","读取文件ReadFile",(err, data) => {
        if ( err ) {
            throw new Error(err)
        }
        console.log(data);  // undefined
        
    })

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
```
运行上面的代码后，`readFile.txt`里面的内容发生了变化。如果需要测试代码，需要先清空里面的文字。

`writeFileSync` 方法用于同步写入文件。
```javascript
fs.writeFileSync(path, str, "utf8")
```
三个参数：
- 文件路径
- 传入的字符串
- 文件的编码，默认是`utf8`

# exists(path, callback) 与 existsSync(path)
`exists`方法用于判断路径是否存在。两个参数都必须拥有：
- 路径
- callback：回调函数有`一个参数`，表示是否存在的`布尔值`

无论结果如何都会调用回调函数

新版本nodejs已经弃用此方法，使用`fs.stat()`或者`fs.access()`方法代替。使用方法都一样。

```javascript
var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    fs.exists("./a.js",(bool) => {
        console.log(bool)  // false
    })

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
```

`existsSync`方法为同步读取。直接返回一个`布尔值`。
同步方法nodejs没有废弃，不过也可以使用`fs.statSync(path)`与`fs.accessSync(path)`
```javascript
var http = require("http");
var fs = require("fs");


http.createServer((req,res) => {
    res.writeHead(200,"Content-Type: text/plain;charset=uft8");
    // 因为异步所以后执行 console
    fs.exists("./a.js",(bool) => {
        console.log(bool)  // false
    })
    
    console.log(fs.existsSync("./a.js") ? "yes" : "no") // no

    res.end()
}).listen(5000,"127.0.0.1");
console.log("listen at http://127.0.0.1:5000");
```

# mkdir() 与 mkdirSync()
`mkdir`方法用于新建一个目录。有三个参数
- 包含目录名字的路径
- 可选：权限值，默认`0o777`。一般不设置。
- 回调函数，就一个`err`参数

```javascript   
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
```
配合`readFile()`与`writeFile()`有奇效。

`mkdirSync()`为同步创建，就不存在回调函数。

# readdir() 与 readdirSync()
`readdir`方法用于读取目录，返回一个所包含的文件和子目录的**数组**。
```javascript
var http = require("http");
var fs = require("fs");

http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    fs.readdir("./",(err, files)=>{
        if (err) {
            console.log(err);
            return;
        }

        console.log(files); 
        /* 
            ['1.txt',
            'exists.js',
            'mkdir.js',
            'readdir.js',
            'readFile.js',
            'readFile.txt',
            'README.md',
            'writeFile.js',
            'writeFile.txt']
        */
        res.end()
    })
}).listen(3000, "127.0.0.1")
```
这个与`readFile`方法其实差别不大。
`readdirSync`就是他的同步方法。

# stat()
`stat`方法的参数是一个文件或者目录。他产生一个对象，次对象包含了该文件或目录的具体的信息。`我们往往通过此方法，判断正则处理的是一个文件还是一个目录。`
```javascript
var http = require("http");
var fs = require("fs");

http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    fs.readdir("./",(err, files)=>{
        if (err) {
            console.log(err);
            return;
        }

        console.log(files);
        files.forEach(file => {
            fs.stat("./" + file, (err, stats)=>{
                if (err) {
                    throw err
                }
                if (stats.isFile()) {
                    res.write(`${stats}是文件`)
                } else if (stats.isDirectory() ){
                    res.write(`${stats}是文件夹`)
                }
            })
        });
    })
}).listen(3000, "127.0.0.1")
```
最后的结果是
```
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
[object Object]是文件
```
确实。每一个都是文件

# watchFile() 与 unwatchFile()
`watchFile`方法监听一个文件，如果该文件发生变化，就会自动触发回到函数。
```javascript
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
```
下面是修改`watchFile.txt`文件后`curr`与`prev`的状态
```
# curr
Stats {
  dev: 1471824175,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 562949953450850,
  size: 0,
  blocks: undefined,
  atimeMs: 1517422824237,
  mtimeMs: 1517422887485.954,
  ctimeMs: 1517422887485.954,
  birthtimeMs: 1517422558296.34,
  atime: 2018-01-31T18:20:24.237Z,
  mtime: 2018-01-31T18:21:27.486Z,
  ctime: 2018-01-31T18:21:27.486Z,
  birthtime: 2018-01-31T18:15:58.296Z }

# prev
Stats {
  dev: 1471824175,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 562949953450850,
  size: 15,
  blocks: undefined,
  atimeMs: 1517422824237,
  mtimeMs: 1517422862127.5117,
  ctimeMs: 1517422862127.5117,
  birthtimeMs: 1517422558296.34,
  atime: 2018-01-31T18:20:24.237Z,
  mtime: 2018-01-31T18:21:02.128Z,
  ctime: 2018-01-31T18:21:02.128Z,
  birthtime: 2018-01-31T18:15:58.296Z }
```
可以看到`size`的值由原来的0变为了15

`unwatchFile`方法用于解除对文件的监听。

# createReadStream()
`createReadStream`方法用于打开大型的文本文件，创建一个读取操作的数据流。所谓的大型文件指的是：`文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个`data`事件，发送结束触发`end`事件`。
```javascript
var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream('lines.txt');
readLines(input, func);
```

# createReadStream()
`createWriteStream` 方法创建一个写入数据流对象，该对象的`write`方法用于写入数据，`end`方法用于结束写入操作。
```javascript
var out = fs.createWriteStream(fileName, {
  encoding: 'utf8'
});
out.write(str);
out.end();
```

`createReadStream`与`createReadStream`配合使用可以实现拷贝大型文件。
```javascript
function fileCopy(filename1, filename2, done) {
  var input = fs.createReadStream(filename1);
  var output = fs.createWriteStream(filename2);

  input.on('data', function(d) { output.write(d); });
  input.on('error', function(err) { throw err; });
  input.on('end', function() {
    output.end();
    if (done) done();
  });
}
```

`createReadStream`与`createReadStream`的具体使用可以查看`Nodejs`的[Stream接口]()。