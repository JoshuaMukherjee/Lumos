var http = require('http');
var fs = require('fs');
var url = require("url");
const Gpio = require('pigpio').Gpio;

const motor = new Gpio(14, { mode: Gpio.OUTPUT }); //create servo

//create a server object:
http.createServer(function (req, res) {
    fs.readFile('/home/pi/Lumos/index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        console.log("Starting");
        var params = url.parse(req.url, true).query;
        if (params.state == 1) {
            left()
        } else if (params.state == 0) {
            right()
        }
        setTimeout(() => { resetMotor() }, 500);

        return res.end();
    });
}).listen(8080); //the server object listens on port 8080


var left = function () {
    //OFF
    motor.servoWrite(2500)
    console.log("on")
}

var right = function () {
    //ON
    motor.servoWrite(500)
    console.log("off")

}

var resetMotor = function () {
    motor.servoWrite(1500);
    setTimeout(() => { motor.servoWrite(0); }, 500);
    console.log("reset");
}




