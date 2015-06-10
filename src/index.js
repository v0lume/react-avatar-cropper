import React from "react";
import AvatarCropper from "../../lib";

var App = React.createClass({
  getInitialState: function() {
    return {
      cropperOpen: false,
      img: null,
      croppedImg: "http://media2.giphy.com/media/fWrorpy7Jrlvi/200w_s.gif"
    }
  },
  handleFileChange: function(dataURI) {
    console.log("new file", dataURI);
    this.setState({
      img: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true
    });
  },
  handleCrop: function(dataURI) {
    this.setState({
      cropperOpen: false,
      img: null,
      croppedImg: dataURI
    });
  },
  render () {
    return (
      <div>
        <img src={this.state.croppedImg} />
        <FileUpload handleFileChange={this.handleFileChange} />
        {this.state.cropperOpen &&
          <AvatarCropper onCrop={this.handleCrop} image={this.state.img} width={400} height={400} />
        }
      </div>
    );
  }
});

var FileUpload = React.createClass({

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <input type="file" onChange={this.handleFile} />
    );
  }
})

React.render(<App />, document.body);
// React.render(<App />, document.getElementById("cropper"));
