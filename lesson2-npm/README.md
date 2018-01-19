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

使用下面的命令可以在安装模块的时候，`package.json`将记录模块的确切版本，而不是一个可选的版本的范围。
```
npm set save-exact true
```

# npm config
```
npm config set prefix $dir
```
此命令可以将指定的`$dir`目录设置为`全局安装目录`。
这个命令在发现我没有权限`npm install`的时候很有用，有这个命令就不需要`sudo`命令授权。

在执行`npm install`的后，每一个模块前面会有一个`^`符号，表示只能安装此版本以上的模块，即允许小版本升级。
![npm ^](http://p0hnox1tr.bkt.clouddn.com/npm%20%5E.png)

使用以下命令可以变为`只允许补丁包的升级`。
```
npm config set save-prefix ~
```

使用以下命令可以在使用`npm init`时，设置默认的`name`与`email`。
```
npm config set init.author.name $name
npm config set init.author.email $email
```
当然也可以使用`npm set`指定全局的默认`name`与`email`。

# npm info
使用`npm info`命令可以查看每个模块的具体信息。
```
npm info data
```
`data`即为之前安装的模块