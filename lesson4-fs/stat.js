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
                // stats就是每一个文件或者是文件夹
                if (stats.isFile()) {
                    res.write(`${stats}是文件`)
                } else if (stats.isDirectory() ){
                    res.write(`${stats}是文件夹`)
                }
            })
        });
    })
}).listen(3000, "127.0.0.1")

