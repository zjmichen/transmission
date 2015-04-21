
document.addEventListener("DOMContentLoaded", function() {
  console.log("Document ready.");

  var Message = React.createClass({displayName: "Message",
    render: function() {
      return React.createElement("p", null, this.props.msg);
    }
  });

  var MessageList = React.createClass({displayName: "MessageList",
    getInitialState: function() {
      return {messages: ["Incoming transmission... please wait."]};
    },
    addMessage: function(msg) {
      this.state.messages.push(msg);
    },
    render: function() {
      var createItem = function(text, index) {
        return React.createElement("p", {key: index + text}, text);
      };

      return React.createElement("div", null, this.state.messages.map(createItem));
    }
  });


  var socket = io.connect("http://localhost:3000");
  var messageList = React.render(React.createElement(MessageList, null), document.getElementById("messages"));

  socket.on('newmessage', function(message) {
    console.log("Got message: " + message);
    messageList.setState(function(state) {
      console.log(state);
      return {messages: state.messages.concat(message)};
    });
    // messageList.forceUpdate();
  });

});

