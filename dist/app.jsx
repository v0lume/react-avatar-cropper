var React = require("react");
var AvatarCropper = require("./ReactAvatarCropper.min.js");

var App = React.createClass({
  render: function() {
    return (
      <AvatarCropper image="/pic.jpg" width={400} height={400} />
    );
  }
})

React.render(<App />, document.body);

