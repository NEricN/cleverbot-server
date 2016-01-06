var restify = require('restify');
var cleverbot = require('cleverbot-node');

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var cleverCallback = function(res, clever, next) {
    return function(response) {
        var state = {
            params: clever.params,
            cookies: clever.cookies
        }

        res.send({
            "response" : response.message,
            "state" : new Buffer(JSON.stringify(state)).toString("base64")
        })

        next();
    }
}

server.post('/write', function (req, res, next) {
    var clever = new cleverbot;
    if(req.body.message) {
        try {
            var state = JSON.parse(new Buffer(req.body.state, "base64").toString("ascii"))
            clever.params = state.params;
            clever.cookies = state.cookies;
            clever.write(req.body.message, cleverCallback(res, clever, next))
        } catch(e) {
            clever.prepare(function() {
                clever.write(req.body.message, cleverCallback(res, clever, next));
            })
        }
    } else {
        res.send(422, {message: "You need a message."})
    }
});

server.listen(3000, function () {
    console.log("Listening on port 3000...");
});