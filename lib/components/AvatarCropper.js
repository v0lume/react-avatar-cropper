import React from "react";
import {isDataURL} from "../utils";

class Cropper extends React.Component {

  constructor () {
    super();

    // getInitialState
    this.state = {
      dragging: false,
      image: {},
      mouse: {
        x: null,
        y: null
      },
      preview: null
    };

    // getDefaultProps
    this.defaultProps = {
      zoom: 1
    }

  }

  fitImageToCanvas (width, height) {
    var scaledHeight, scaledWidth;

    var canvasAspectRatio = this.props.height / this.props.width;
    var imageAspectRatio = height / width;

    // if the image is wider than the canvas ratio
    // we'll scale the height
    if (canvasAspectRatio > imageAspectRatio) {
      scaledHeight = this.props.height;
      var scaleRatio = scaledHeight / height;
      scaledWidth = width * scaleRatio;
    } else {
      scaledWidth = this.props.width;
      var scaleRatio = scaledWidth / width;
      scaledHeight = height * scaleRatio;
    }

    return { width: scaledWidth, height: scaledHeight };
  }

  prepareImage (imageUri) {
    var img = new Image();
    img.onload = () => {
      var scaledImage = this.fitImageToCanvas(img.width, img.height);
      scaledImage.resource = img;
      scaledImage.x = 0;
      scaledImage.y = 0;
      this.setState({dragging: false, image: scaledImage});
    }
    if (!isDataURL(imageUri)) img.crossOrigin = 'anonymous';
    img.src = imageUri;
  }

  clearCanvas (context) {
    context.save();
    context.translate(0, 0);
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.restore();
  }

  mouseDownListener (e) {
    e.preventDefault();
    this.setState({
      image: this.state.image,
      dragging: true,
      mouse: {
        x: null,
        y: null
      }
    });
  }

  mouseUpListener (e) {
    this.setState({ dragging: false, preview: this.toDataURL() });
  }

  mouseMoveListener (e) {
    if (!this.state.dragging) return;

    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var imageX = this.state.image.x;
    var imageY = this.state.image.y;

    var newImage = this.state.image;

    if (this.state.mouse.x && this.state.mouse.y) {
      var dx = this.state.mouse.x - mouseX;
      var dy = this.state.mouse.y - mouseY;

      var bounded = this.boundedCoords(imageX, imageY, dx, dy);

      newImage.x = bounded.x;
      newImage.y = bounded.y;
    }

    this.setState({
      image: this.state.image,
      mouse: {
        x: mouseX,
        y: mouseY
      }
    });
  }

  boundedCoords (x, y, dx, dy) {
    var newX = x - dx;
    var newY = y - dy;

    var scaledWidth = this.state.image.width * this.props.zoom;
    var imageLeftEdge = this.state.image.x - (scaledWidth - this.state.image.width) / 2;
    var imageRightEdge = (imageLeftEdge + scaledWidth);

    var rightEdge = this.props.width;
    var leftEdge = 0;

    if (imageRightEdge - dx < rightEdge) { x = x; }
    else if (imageLeftEdge - dx > leftEdge) { x = x; }
    else { x = newX; }

    var scaledHeight = this.state.image.height * this.props.zoom;
    var imageTopEdge = this.state.image.y - (scaledHeight - this.state.image.height) / 2;
    var imageBottomEdge = imageTopEdge + scaledHeight;

    var bottomEdge = this.props.height
    var topEdge = 0;
    if (imageBottomEdge - dy < bottomEdge) { y = y; }
    else if (imageTopEdge - dy > topEdge) { y = y; }
    else { y = newY; }

    return { x: x, y: y };
  }

  componentDidMount () {
    var canvas = React.findDOMNode(this.refs.canvas);
    var context = canvas.getContext("2d");
    this.prepareImage(this.props.image);
    this.clearCanvas(context);
    document.addEventListener("mousemove", this.mouseMoveListener.bind(this), false);
    document.addEventListener("mouseup", this.mouseUpListener.bind(this), false);
    canvas.addEventListener("mousedown", this.mouseDownListener.bind(this), false);
  }

  componentWillUnmount () {
    document.removeEventListener("mousemove", this.mouseMoveListener);
    document.removeEventListener("mouseup", this.mouseMoveListener);
  }

  componentDidUpdate () {
    var context = React.findDOMNode(this.refs.canvas).getContext("2d");
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.clearCanvas(context);
    this.addImageToCanvas(context, this.state.image);
  }

  addImageToCanvas (context, image) {
    if (!image.resource) return;
    context.save();
    context.globalCompositeOperation = "destination-over";
    var scaledWidth = this.state.image.width * this.props.zoom;
    var scaledHeight = this.state.image.height * this.props.zoom;

    var x = image.x - (scaledWidth - this.state.image.width) / 2;
    var y = image.y - (scaledHeight - this.state.image.height) / 2;

    // need to make sure we aren't going out of bounds here...
    x = Math.min(x, 0);
    y = Math.min(y, 0);

    console.log(y);
    console.log(scaledHeight);
    y = scaledHeight + y >= this.props.height ? y : (y + (this.props.height - (scaledHeight + y)));
    x = scaledWidth + x >= this.props.width ? x : (x + (this.props.width - (scaledWidth + x)));

    context.drawImage(
      image.resource,
      x,
      y,
      image.width * this.props.zoom,
      image.height * this.props.zoom);
    context.restore();
  }

  toDataURL () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = this.props.width;
    canvas.height = this.props.height;

    this.addImageToCanvas(context, {
      resource: this.state.image.resource,
      x: this.state.image.x,
      y: this.state.image.y,
      height: this.state.image.height,
      width: this.state.image.width
    });

    return canvas.toDataURL();
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height}></canvas>
        {this.state.preview &&
          <div>
            <img height={50} width={50} src={this.state.preview} />
          </div>
        }

      </div>
    );
  }
};

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
