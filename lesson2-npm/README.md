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

也可以查看具体的信息。比如版本
```
npm info data version
```

# npm search
使用`npm search`可以搜索npm仓库，后面可以跟字符串也可以跟RegExp。
```
npm search data
```
不过这个基本不使用，因为没有具体的说明，若果是要搜索仓库，建议直接去
[npm官网](https://www.npmjs.com/)

# npm list
使用次命令可以以竖型结构列出当前项目的所有模块以及他们的依赖。加上`-global`可以列出全局安装的模块。
```
npm list -global
```
也可以列出指定的模块
```
npm list data
```

# npm install
## 基本
`npm install`是用的最多的一个命令，可以安装node模块。

每个模块都可以`全局安装`或者`本地安装`.
- 全局安装：讲一个模块安装在系统目录中，各个项目都可以调用。一般来说，全局安装值适用于工具模块，比如`wewbpack``gulp`等等。使用全局安装只需要在安装的时候加上一个`-g`或者是`-golbal`
- 本地安装：将一个模块安装到当前目录下的`node_modules`子目录，只有当前项目才可以调用这个模块。

```
# 本地安装
npm install data

# 全局安装
npm install webpack -g
# 或者
npm install webpack -global
```

也可以直接输入github代码库地址，不过使用的不多。

在使用`npm install`的是添加一个`-f`或者`-force`可以强制安装，无论此模块是否安装过。

如果是重新安装全部的模块就删除`node_modules`执行`npm install`。此时会从`package.json`中寻找需要安装的依赖。

## 安装不同的版本
默认的`npm install`命令总是安装模块最新的版本，我们可以在模块名后面加上一个`@版本号`安装指定的版本。
```
# 安装最新
npm install data@latest

# 安装0.1.0版本
npm install data@0.1.0

# 安装区间的一个版本
npm install data@">0.1.0 <0.2.1"
```

在安装是可以指定模块属于哪一种性质的依赖关系。
- `--save`：模块名将被添加到`dependencies`，可以简化为参数`-S`。发布后需要用的的模块
- `--save-dev`：模块名将被添加到`devDependencies`，可以简化为参数`-D`。发布会不需要用的的模块

当在只有`package.json`的时候，没有`node_modules`。使用`npm install`会将`dependencies`与`devDependencies`都安装了。此时可以使用以下命令只安装`dependencies`的模块
```
npm install --production
# 或者
NODE_ENV=production npm install
```
不过不建议使用上面的命令。以免因为模块缺失导致项目无法运行。

安装的模块可以使用`require`命令加载。
```
var http = require("http")
```

# 避免系统权限
默认清情况下node的模块都是安装到系统目录`(C:\Users\Administrator\AppData\Roaming\nvm\v8.9.1\node_modules\npm\lib)`,普通用户没有写入权限，这是需要用到`sudo`命令。如果每安装一个都需要使用此权限，不方便。此时在**主目录**可以配置一个`.npmrc`文件，然后在此文件中将`prefix`变量定义到主目录下面。
```
prefix = /home/yourUsername/nmp
```
在这个**主目录**下面新建`npm`子目录。
```
mkdir ~/npm
```
此后，全局安装的模块都会安装在这个子目录中。也是去`bin`目录寻找。

最后，将这个路径在`.bash_profile`文件或者`.basjrc`中加入PATH变量。
```
export PATH = ~/npm/bin:$PATH
```

# npm updata，npm uninstall
使用`npm update`命令可以更新本地安装的模块。`...`表示模块名字。
```
# 升级当前项目的指定模块
npm update ...

# 升级全局安装的模块
npm update ... -global
```
上面的命令行只会更新顶层模块，而不会更新依赖。试下下面的命令可以更新依赖
```
npm --depth 9999 update
```
上面的`9999`就是一个数字，给一个很大的数可以保证下面的依赖都被选中。

使用`npm uninstall`可以写在某个模块
```
npm uninstall ...

# 卸载全局模块
npm uninstall ... -global
```

# npm run
使用`npm run`可以执行脚本。`package.json`文件的`scripts`字段中可以指定命令脚本。
```json
{
  "name": "lesson2-npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "echo \"start 命令\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "data": "^0.6.1"
  }
}
```
运行命令可以使用`npm run ...`启动命令。比如上面的`test`与`start`。可以使用`npm run test`与`npm run start`启动不同的脚本。这两个都是`npm`默认内置的两个命令。可以简写为`npm test`与`npm start`。其他的命令都必须加上`start`。

如果运行时不加上具体的命令，即使用`npm run`，会列出全部的命令，而不是运行。
```
npm run

Lifecycle scripts included in lesson2-npm:
  test
    echo "Error: no test specified" && exit 1
  start
    echo "start 命令" && exit 1
```

还可以在`scripts`中像下面那样执行配置
```
"build": "npm run start && npm run test"
```
注意上面的是两个`&&`连接。表示先运行`npm run start`在运行`npm run test`。如果使用的是一个`&`，则表示同时运行。

## scripts常用脚本命令
`npm-run-all`模块可以运行多个`scripts`中的脚本命令。
```
npm i npm-run-all -D
```


```
# 继发执行，即先执行一个在执行下一个
$ npm-run-all a.js b.js
# 等同于
$ npm run a.js && npm run b.js

# 并行执行，即同时执行
$ npm-run-all --parallel a.js b.js
# 等同于
$ npm run a.js & npm b.js

# 混合执行
$ npm-run-all a.js --parallel b.js c.js
# 等同于
$ npm-run-all a.js 
$ npm-run-all --parallel b.js c.js
```
### 常用命令
1. `start`命令：用于启动应用程序。
2. `dev`命令：规定开发阶段所要做的处理，比如监视文件变化、实时编译……\
3. `serve`命令：用于启动服务
```
"serve": "live-server dist/ --port=9090"
```
上面命令启动服务，用的是`live-server`模块，将服务启动在9090端口，展示dist子目录。

使用`npm run serve`将自动启动浏览器在端口909，并监听页面的的变化

4. `test`命令：一般用于执行测试：单元测试、*-lint……
5. `prod`命令：一般用于规定进入生产环境时需要做的处理
6. `help`命令：一般用于展示帮助信息。
7. `docs`令：一般用于生成文档。

## pre-与post-
`npm run`为每条命令提供了`pre-`和`post-`两个钩子（hook）。
一个简单的例子
```json
  "scripts": {
    "pretest": "echo \"pretest\"",
    "test": "echo \"test\"",
    "posttest": "echo \"posttest\"",
    "start": "echo \"start 命令\"",
    "build": "npm run start && npm run test"
  }
```
上面的`scripts`中的`test`。如果执行`npm test`会执行这两个钩子。先执行`pre-`在执行`post-`，所以最后输出
- pretest
- text
- posttest

## 内部变量
`scripts`字段可以使用一些内部变量，主要是package.json的各种字段。

比如，package.json的内容是`{"name":"foo", "version":"1.2.5"}`，那么变量`npm_package_name`的值是foo，变量`npm_package_version`的值是1.2.5。
```
{
  "scripts":{
    "bundle": "mkdir -p build/$npm_package_version/"
  }
}
```
运行`npm run bundle`以后，将会生成`build/1.2.5/`子目录。

`config` 字段也可以用于设置内部字段。
```
  "name": "fooproject",
  "config": {
    "port": "3001"
  },
  "scripts": {
    "serve": "http.createServer(...).listen(process.env.$npm_package_config_port)"
  }
```
上面代码中，变量 `npm_package_config_port` 对应的就是 `3001`。

## npm匹配规则
- `*` 匹配0个或多个字符
- `?` 匹配1个字符
- `[...]` 匹配某个范围的字符。如果该范围的第一个字符是`!`或 `^`，则匹配不在该范围的字符。
- `!(pattern|pattern|pattern)` 匹配任何不符合给定的模式
- `?(pattern|pattern|pattern)` 匹配0个或1个给定的模式
- `+(pattern|pattern|pattern) `匹配1个或多个给定的模式
- `*(a|b|c)` 匹配0个或多个给定的模式
- `@(pattern|pat*|pat?erN)` 只匹配给定模式之一
- `**` 如果出现在路径部分，表示0个或多个子目录。