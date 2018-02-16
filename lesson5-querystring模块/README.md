# querystring
`querystring`模块主要是用于解析是查询字符串。

## querysring.parse()
用法：`querystring.parse(str[, sep[, eq[, options]]])`
`querystring.parse()`方法是用于将一个查询字符串解析为JavaScript对象。
此方法接收四个参数：
- `str`：需要解析的字符串，必选
- `sep`：多个键值之间的分隔符，默认是`&`
- `eq`：键名与键值之间的分隔符，默认是`=`
- `options`：配置对象。有两个属性。`decodeURIComponent`属性是一个函数，用于将编码后的字符串还原，默认是使用的`querystring.unescape()`方法，`maxKeys`属性指定最多解析多少个属性。默认是`1000`，如果设置为`0`则表示不限制数量。

后面三个参数都是可选的参数，一个不需要设置。我们都采用默认的值。

当然，如果你是需要重新设置第四个参数，前面两个不需要变动，是需要站位的。可以传入一个`null`。

例如：

```javascript
querysting.parse("foo=bar&abc=xyz", null, null, {
    decodeURIComponent: function(){},
    maxKeys: 0
})
```

最后得到的是一个JavaScript对象。格式如下：
```json
{
    foo: bar,
    abc: xyz
}
```

因为此方法的第二与第三个参数，我们可以用于处理一般的字符串。

```javascript
var str = "mame: Anthony; age: 0, sex: man";

querystring.parse(str, ";", ":")

// 得到如下结果
// {
//     name: "Anthony",
//     age: 0,
//     sex: "max"
// }
```
