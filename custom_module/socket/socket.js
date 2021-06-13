_socket = null;
module.exports = {
    connectSocket: function(io) {
        io.on('connection', function(socket) {
            console.log("New client connected");
            _socket = socket
            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    },
    emitSocket : function (data) {
        _socket.emit("FromAPI", data);
    }
}