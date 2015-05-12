import React from "react";
import AvatarCropper from "../../lib";

var App = React.createClass({
  render () {
    return (
      <AvatarCropper />
    );
  }
});

React.render(<App />, document.body);
