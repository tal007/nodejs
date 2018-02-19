# URL模块
url模块用于生成和解析URL。

## l类
`url`模块可以使用`new`关键词新建一个`URL`对象
。方法接收两个参数、
- 需要的一个`URL地址`
- 相对于第一个`URL地址`的域名与协议（protocol）。可选，一般不需要。

使用`new`关键词创建一个对象后，得到一个与`URL`有关的对象,有以下属性：
### hash
获取及设置URL的分段(hash)部分。网址`#`后面的内容
```javascript
var myurl = new URL("https://example.org/foo#bar");

console.log(myurl.hash);
// 输出 bar
```
### host
获取及设置URL的主机(host)部分。协议`http://`后面，第一个`/`前面的部分。比如[www.lytblog.com:80](www.lytblog.com:80)

### hostname
获取及设置URL的主机名(hostname)部分。 `url.host`和`url.hostname`之间的区别是`url.hostname`**不包含端口**。
协议`http://`后面，第一个`/`前面的部分。比如[www.lytblog.com](www.lytblog.com)

### href
获取及设置序列化的URL。即这个网址

### origin
获取只读序列化的URL origin部分。协议加`host`部分，比如[http://www.lytblog.com](http:www.lytblog.com)

### password
获取及设置URL的密码(password)部分。

### pathname
获取及设置URL的路径(path)部分。

```javascript
const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname);
  // 输出 /abc/xyz
```

### port
获取及设置URL的端口(port)部分。即端口号

### protocol
获取及设置URL的协议(protocol)部分。`http:`或者是`https:`。需要注意的是，这个值是`带冒号`的

### search
获取及设置URL的序列化查询(query)部分部分。`?`后面的东西

### username
获取及设置URL的用户名(username)部分。

### toString()方法
### toJSON()方法

## 方法
上面的属性得到的内容基本可以使用方法得到。每一个属性都对应了一个方法。比如：`href`属性对应有一个`href`方法，用于获取这个`URL`的地址。

使用方法就是
```javascript
const {url} = require("url");
var str = "http://www.lytblog.com"
url.href(str)
```

上面说到的属性都有对应的方法，都是传入一个`url`作为参数。

## 还有两个用的比较多的方法
- url.parse()：用于把url字符串转化为一个json对象。
- url.resolve()：用于生成URL。

`url.parse()`支持3个参数：
- urlString：`string`。要解析的 URL 字符串。
- parseQueryString：`boolean`。如果为 `true`，则 `query` 属性总会通过 `query`string 模块的 parse() 方法生成一个对象。 如果为 `false`，则返回的 URL 对象上的 `query` 属性会是一个未解析、未解码的字符串。 默认为 `false`。
- slashesDenoteHost：`boolean`。如果为 `true`，则 // 之后至下一个 / 之前的字符串会被解析作为 host。 例如，//foo/bar 会被解析为 {host: 'foo', pathname: '/bar'} 而不是 {pathname: '//foo/bar'}。 默认为 `false`。

一般使用这个方法的时候都只需要传入一个参数即可。

`url.resolve()`需要两个参数：
- form：`string`。解析时相对的基本 URL。
- to：`string`。要解析的超链接 URL。

`url.resolve`方法用于生成URL。它的第一个参数是基准URL，其余参数依次根据基准URL，生成对应的位置。
下面看看官网给出的几个例子：
```javascript
const url = require('url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

我们可以自己总结一下：
使用此方法的时候可以将第一个参数的最后一个`/`后面的字符修改为指定的字符从而达到将`URL`地址变更的功能。