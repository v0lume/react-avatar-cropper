var React = require("react");
var AvatarCropper = require("./ReactAvatarCropper.min.js");

var App = React.createClass({
  render: function() {
    return (
      <AvatarCropper image="http://placekitten.com/1920/900" width={400} height={400} />
    );
  }
})

React.render(<App />, document.body);

