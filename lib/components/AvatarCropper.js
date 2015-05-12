import React from "react";

class AvatarCropper extends React.Component {

  constructor () {
    super();
    this.state = {
      dragging: false,
      image: {},
      mouse: {
        x: null,
        y: null
      }
    };
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

    console.log(scaledHeight);
    console.log(scaledWidth);

    return { width: parseInt(scaledWidth), height: parseInt(scaledHeight) };
  }

  prepareImage (imageUri) {
    var img = new Image();
    img.onload = () => {
      var scaledImage = this.fitImageToCanvas(img.width, img.height);
      scaledImage.resource = img;
      scaledImage.x = 0;
      scaledImage.y = 0;
      console.log(scaledImage);
      this.setState({dragging: false, image: scaledImage});
    }
    img.src = imageUri;
  }

  clearCanvas (context) {
    context.save();
    context.translate(0, 0);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.restore();
  }

  mouseDownListener (e) {
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
    this.setState({ dragging: false });
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
      var newX = imageX - dx;
      var newY = imageY - dy;

      var bounded = this.boundedCoords(newX, newY);
      console.log(bounded);

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

  boundedCoords (x, y) {
    var topEdge = 0;
    var bottomEdge = this.props.height - this.state.image.height;
    var rightEdge = this.props.width - this.state.image.width;
    var leftEdge = 0;

    if (x < rightEdge) x = rightEdge;
    if (x > leftEdge) x = leftEdge;
    if (y > topEdge) y = topEdge;
    if (y < bottomEdge) y = bottomEdge;

    return { x: x, y: y };
  }

  componentDidMount () {
    var canvas = React.findDOMNode(this);
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
    var context = React.findDOMNode(this).getContext("2d");
    context.clearRect(0, 0, this.props.width, this.props.height);
    this.clearCanvas(context);
    this.addImageToCanvas(context, this.state.image);
  }

  addImageToCanvas (context, image) {
    if (!image.resource) return;
    context.save();
    context.globalCompositeOperation = "destination-over";
    context.drawImage(image.resource, image.x, image.y, image.width, image.height);
    context.restore();
  }

  render () {
    return (
      <canvas width={this.props.width} height={this.props.height}></canvas>
    );
  }
};

export default AvatarCropper;
