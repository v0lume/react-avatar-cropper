# react-avatar-cropper

React Avatar Cropper is aiming to be the end all be all complete
solution for facebook style avatar cropping. It is this components
responsibility to be able to crop an image to a square ratio and provide
the cropped data back to the calling component.

## Usage

Usage of `react-avatar-cropper` is simple, just require the component
and use it where you are in need of the cropper. The most common use
case will likely be in a modal after uploading an image to use as an
avatar.

```js
// require the component...
var AvatarCropper = require("react-avatar-cropper");

// and in the render function of wherever you please...
render: function() {
  return (
    <AvatarCropper
      image="http://placekitten.com/1920/900"
      width={400}
      height={400}
      onComplete={this.finishCropping}
    />
  );
});
```

## Example

There is an example of this common use case on the page for this plugin.
Most importantly we pass the cropped DataURI back through your provided
onComplete function.

## Contributing

Feel free to place issues on the issue tracker or place a pull request
regarding any functionality. I would like to keep this package limited
to providing a great solution for the wide 99% use case that people have
for avatar croppers.

-----------------------

Thanks for looking! <3
