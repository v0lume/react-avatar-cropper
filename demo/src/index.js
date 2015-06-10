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
    this.setState({
      img: dataURI,
      cropperOpen: true
    })
  },
  render () {
    var cropper;
    if (this.state.cropperOpen) {
      cropper = <AvatarCropper image={this.state.img} width={400} height={400} />
    }
    return (
      <div>
        <div className="pic">
          <div className="img"><img src={this.state.croppedImg} /></div>
          <i className="fa fa-plus"></i>
          <i className="fa fa-check"></i>
        </div>
        <FileUpload handleFileChange={this.handleFileChange} />
        {cropper}
      </div>
    );
  }
});

var FileUpload = React.createClass({

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

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

React.render(<App />, document.getElementById("avatarFunctionality"));
// React.render(<App />, document.getElementById("cropper"));
