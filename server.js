var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
	response.writeHead(200, {'Content-Type': 'text/plain'});
	  response.write("Hi \n\n");
	  response.end("200 OK \n");
});

server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});
wss.on('connection', function(ws) {
  console.log("New connection");
  ws.on('message', function(message) {
    ws.send("Received: " + message);
  });
  ws.send('Welcome!');
});

console.log("Listening to " + ipaddress + ":" + port + "...");



