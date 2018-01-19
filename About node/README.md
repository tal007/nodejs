# node简介
Node是JavaScript语言的`服务器运行环境`。

以上就说明：
1. JavaScript是通过Node在服务器上运行，即Node是JavaScript的虚拟机
2. Node提供大量的工具库，使得JavaScript语言与操作系统互动，即Node又是JavaScript的工具库。

## 安装与更新
访问网站[https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/)查看与下载最新版本的Node。根据自己的电脑下载指定版本的Node并安装。

安装完成以后可以使用以下命令查看是否正常运行以及版本
```
node --version
# 或者
node -v
```
如果是更新node.js的版本，可以使用nodejs的`n`模块完成
```
npm install n -g
# 或者
n stable
```
也可以使用`n`模块安装指定版本的node
```
n 0.10.21
# 或者
n v0.10.21
```
## 版本管理工具mvm
使用`nvm`可以在一台机器安装多个版本的node.js
linux系统的github地址：[点我](https://github.com/creationix/nvm)

如果你是windows系统，直接下载安装就好了
windows-nvm的github地址 [点我](https://github.com/coreybutler/nvm-windows)

windows-nvm的下载地址 [点我去下载](https://github.com/coreybutler/nvm-windows/releases)

安装了`nvm`以后可以使用以下命令
```
# 安装最新版本node
nvm install node

# 安装指定版本
nvm install 8.9.1

# 使用已安装的最新版本
nvm use node

# 使用指定版本的node
nvm use 0.12
```

进入指定版本的REPL环境
```
nvm run 0.12
```

其他常用命令
```
# 查看本地安装的所有版本
nvm ls

# 查看服务器上所有可供安装的版本。
nvm ls-remote

# 退出已经激活的nvm，使用deactivate命令。
nvm deactivate
```

## 基本用法
安装完nodejs后就可以使用node命令读取JavaScript脚本
当前目录的`index.js`脚本文件，可以这样执行
```
node index
# 或者
node index.js
```

使用 `-e`参数可以执行代码字符串
```
node -e "console.log('你好世界')"
```

## REPL环境
在命令行键入node命令，后面没有文件名，就进入一个Node.js的REPL环境（Read–eval–print loop，“读取-求值-输出”循环），可以直接运行各种JavaScript命令。
```
node
> 1+1
2
>
```
这里可以查看一些node的模块。

## 异步操作
node采用的`V8引擎`处理JavaScript脚本，最大的特点就是`单线程运行`，即**一次只能处理一个任务**，这就导致了大量的异步操作。即任务不是马上执行，而是插在任务队列的尾部，等到前面的任务运行完后再执行。

因为需要异步操作，所以node大量的采用了回到函数。

node规定使用函调函数的`第一个参数`必须是一个`错误对象`，表示上一步的错误。这是因为回调函数主要用于异步操作，当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制try…catch对于异步操作行不通，所以只能把错误交给回调函数处理。

## 全局对象与全局变量
全局对象
- global：表示node所在额全局环境，就像浏览器的window对象。如果在浏览器中声明一个全局变量，实际上是声明了一个`全局对象的属性`，比如`var x = 1`等同于设置`window.x = 1`，但是Node不是这样，至少在`模块中`不是这样（REPL环境的行为与浏览器一致）。在`模块文件中`，声明`var x = 1`，该变量`不是`global对象的属性，`global.x等于undefined`。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。
- process：该对象表示node所处的当前进程，允许开发者与该进程互动。
- console：指向node内置的console模块，提供命令行环境中的标准输入、标准输出功能。就像浏览器中的console。

全局函数
- setTimeout()
- clearTimeout()
- setInterval()
- clearInterval()
- require()：用于加载模块
- Buffer()：用于二进制操作

全局变量
- __filename：指向当前运行的脚本文件名。
- __dirname：指向当前运行的脚本所在的目录。

伪全局变量
- module
- module.exports
- exports
- ......

# 模块化结构
nodejs采用的是模块化结构，安装[CommonJS规范](http://wiki.commonjs.org/wiki/CommonJS)定义与使用模块。
模块与文件是一一对应关系，即一个模块对应一个文件。

可以使用`reaquire`命令加载指定的模块，加载时可以省略文件的后缀名。
```javascript
var module1 = require('./module1.js')
// 或者
var module = require('/module1');
```
`require`方法的参数是模块文件的名字。这个参数有两种情况：
1. 参数中包含文件路径，比如上面的例子
2. 参数中不含文件路径。这个时候指向node模块安装的目录，或者是`node_modules`这个文件夹。
```javascript
var http = require('http');
```
有时候一个模块本身就是一个目录，一般为`package.json`，比如：
```javascript
{
    name: "bar",
    main: "./lib/bar.js"
}
```
上面的`name`指的是模块，`main`指的是入口文件，即需要加载的文件。等同于
```javascript
var bar = require('bar/lib/bar.js');
```
这个情况一般存在于`package.json`配置文件。但是如果模块目录中没有这个文件，nodejs会尝试在模块目录中寻找`index.js或者index.node`文件进行加载。

## 核心模块
下面这些模块存在于node的`lib`子目录中，其中一部分可以与操作系统互动，这也是node与其他服务端语言的区别。
- http：提供HTTP服务器功能
- url：解析URL
- fs：与文件系统交互
- querystring：解析URL的查询字符串
- child_process：新建子进程
- util：提供一系列实用小工具
- path：处理文件路径
- crypto：提供加密与解密功能，基本上是对[OpenSSL](https://baike.baidu.com/item/openssl/5454803?fr=aladdin)的包装。

**核心模块总是最优先加载的。**

## 自定义模块
因为nodejs采用的是CommonJS规范，只要符号这个规范就可以使用自定义模块。
定义一个模块：新建一个`module1.js`，内容如下：
```javascript
module.exports = function(x){
    console.log(x)
}
```
这个自定义模块就是。通过`module.exports`对外输出了一个方法。
使用这个模块
```javascript
var module1 = require('./mudule');
module1("自定义模块");
```
因为在定义模块的时候定义`modelu.exports`的是一个函数，所以使用的时候`require`也是一个函数。可以直接加括号运行。

**module变量是整个模块文件的顶层变量，它的exports属性就是模块向外输出的接口。**当然也可以输出其他的东西，比如`JSON`，`Object`等等。

# 异常处理
因为node是单线程运行环境，一旦抛出的错误没有被捕获，就会引起整个进程的崩溃。所以异常处理非常重要。
node有3种方法传递一个错误：
- 使用throw语句抛出一个错误对象
- 将错误对象传递给回调函数（Node采用的方法）
- 通过[EventEmitter](http://nodejs.cn/api/events.html#events_events)，发出一个error事件

捕获错误就使用`try...catch`结构捕获。不过需要注意的是这个结构无法捕获异步异常。

# 命令行运行脚本
node脚本可以作为命令行脚本使用
```
node index.js
```
在REPL环境下运行index.js