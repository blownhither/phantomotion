var Leap = require("leapjs/lib/index")
var net = require('net');
var JsonSocket = require('json-socket');
/*
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 2333 });
*/

var mSocket;
var started = true;
var previousFrame;


var server = net.createServer(function(socket){
	mSocket = socket;
	started = true;
	
	console.log("client connected!");
	
	//socket.on("disconnect", function(){
	//	started = false;
	//})
	
});

/*
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
*/
var fs = require('fs');
var hi = new Date().getTime();

Leap.loop({enableGestures: true}, function(frame) {
	
			if(frame.hands.length > 0){
				var hand = frame.hands[0];
				
				var hhh = new Date().getTime();
				if(hhh - hi < 500)
				{
						;
				}
				else{
						//mSocket.write(hand.rotation + ":" + hand.palmPosition.toString() + "\n");
					
					//wss.broadcast(hand.rotation + ":" + hand.palmPosition.toString() + "\n");
					var x = hand.palmPosition[1];
					if(x >= 200 && x <= 260) {

						x = 230;
					}
					else
						x = (x>260) ? (x-30) : (x+30);
					x=(x - 230)/100;

					var y = (-hand.roll ()/Math.PI).toPrecision(3), ylim = 0.08;
					
					if((y >= -ylim) && (y <= ylim)) {

						y = 0.0;
					}
					//y /= 2;
					/*
					else if (y > ylim)
						y -= ylim;
					else if (y < -ylim)
						y += ylim;
						//y = (y>ylim) ? (y - ylim) : (y + ylim);
					*/
						var k = 0.2;
					fs.writeFile("file.txt", (y*k + ":" + (-hand.pitch()*2/Math.PI*k).toPrecision(3) + ":" + (hand.yaw  ()*8/Math.PI*k).toPrecision(3) + ":" + (x*k).toPrecision(3).toString() + "\n"));
					hi = hhh;
					console.error((y + ":" + (hand.pitch()*2/Math.PI).toPrecision(3) + ":" + (hand.yaw  ()*2/Math.PI).toPrecision(3) + ":" + x.toPrecision(3).toString() + "\n"));
				}
				//wss.broadcast("1");
			}
		
        else {
            fs.writeFile("file.txt", "0:0:0:0\n");
        }
				
		
})

//server.listen(2333, '192.168.43.90');