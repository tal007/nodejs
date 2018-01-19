# npm模块管理器-简介
`npm`有两层含义。
- node的[开放式模块登记和管理系统](https://www.npmjs.com/)
- node默认的模块管理器，是一个命令行下的软件，用了安装和管理node模块

`npm`在安装node的时候会一起安装。但是可能不是最新版本，所以可以使用下面的命令更新到最新版本
```
npm install npm@latest -g
```
上面的命令中，`@latest`表示最新版本，`-g`表示全局安装。所以，命令的主干是`npm install npm`，也就是使用`npm`安装自己。

运行一下命令可以查看各种信息
```
# 查看 npm 命令列表
npm help

# 查看各个命令的简单用法
npm -l

# 查看 npm 的版本
npm -v

# 查看 npm 的配置
npm config list -l
```

# npm init
`npm init`用来初始化生成一个新的`package.json`。会有一系列的询问阶段，如果觉得不需要，则可以跟上一个`-y`跳过询问阶段。
```
npm init -y
```
使用后生成的代码如下
```json
{
  "name": "lesson2-npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

# npm set
`npm set`可以用来设置环境变量
```
npm set init-author-name 'autohr name'
npm set init-author-email 'author email'
npm set init-auhor-url 'author网站'
npm set init-license 'ISC'
```
上面的命令是为`npm init`设置默认值，以后执行`npm init`的时候，`package.json`中的作者姓名，邮箱，主页，许可证字段就会自动写入预设的值。这些信息存放在用户主目录下的`~/.npmrc`文件。
![npmrc](http://p0hnox1tr.bkt.clouddn.com/npmrc.png)
![npm-set](http://p0hnox1tr.bkt.clouddn.com/npm-set.png)
如果某个项目有不同的设置，可以对该项目运行`npm config`。