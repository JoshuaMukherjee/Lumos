var http = require('http');
var fs = require('fs');
var url = require("url");




//create a server object:
http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);

        var params = url.parse(req.url,true).query;
        if(params.state == 1){
            console.log(1); //TODO turn light on
        }else if(params.state == 0){
            console.log(0); //TODO turn light off
        }
        return res.end();
      });
}).listen(8080); //the server object listens on port 8080