import React from "react";
import AvatarCropper from "../../lib";

var App = React.createClass({
  render () {
    return (
      <AvatarCropper image="http://placekitten.com/1920/900" width={400} height={400} />
    );
  }
});

React.render(<App />, document.body);
