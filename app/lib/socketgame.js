module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log("connected");

    setTimeout(function() {
      console.log("sending message");
      socket.emit('newmessage', '<b>Hello.</b>');
    }, 2000);

  });
};