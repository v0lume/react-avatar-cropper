import React from "react";
import Cropper from "./Cropper";

class AvatarCropper extends React.Component {
  constructor () {
    super();
    this.state = {
      zoom: 1
    };
  }

  handleZoomUpdate () {
    var zoom = React.findDOMNode(this.refs.zoom).value;
    this.setState({ zoom: zoom });
  }

  render () {
    return (
      <div>
        <Cropper
          image={this.props.image}
          width={this.props.width}
          height={this.props.height}
          zoom={this.state.zoom}
        />

        <input
          type="range"
          name="zoom"
          ref="zoom"
          onChange={this.handleZoomUpdate.bind(this)}
          min="1"
          max="3"
          step="0.01"
          defaultValue="1"
        />
      </div>
    );
  }
}

export default AvatarCropper;
