# @mapbox/appropriate-images-react

[![Build Status](https://travis-ci.org/mapbox/appropriate-images-react.svg?branch=master)](https://travis-ci.org/mapbox/appropriate-images-react)

🚧🚧 **EXPERIMENTAL! WORK IN PROGRESS!** 🚧🚧

**Use in combination with [appropriate-images].**

After you've generated resized, optimized images with [appropriate-images], you'll want to use them in the browser.
If you use React, you'll want to use them with React.
You'll need to determine *which variant* of the image to load — that is, which size, and whether to load `.webp` or not.
This module does that. It

- measures the element's available width with [react-simple-surveyor](https://github.com/mapbox/react-simple-surveyor);
- combines that width with your [appropriate-images configuration] to get a URL, using [appropriate-images-get-url];
- then renders the appropriate variant of the image.

## API

### scopeAppropriateImage

```
scopeAppropriateImage(imageConfig: Object, options?: Object): Component
```

Creates a React component scoped according to your configuration and options.

#### imageConfig

`Object` - (required)

Your [appropriate-images configuration].
**Use the same configuration at run time, in the browser, as you do at build time, when generating resized, optimized images.**

#### options

`?Object`

##### transformUrl

`?Function` - Default: `x => x`

If you want to transform the URL in some way, use this function.
The original use-case is to use Webpack's augmented `require()` to get the URL *that Webpack creates* — if, for example, you're adding a hash to the end of files loaded with the file-loader.

For example:

```js
const appropriateImagesReact = require('@mapbox/appropriate-images-react');
const AppropriateImage = appropriateImagesReact.scopeAppropriateImage(myImageConfig, {
  transformUrl: url => require(`/my/image/directory/${url}`);
});
```

##### hiResRatio

`?number` - Default: `1.3`

See [the same option for appropriate-images-get-url](https://github.com/mapbox/appropriate-images-get-url#hiresratio).

### AppropriateImage

This is the component that is returned by [`scopeAppropriateImage`].
It can render your image in two ways:

- As an `<img>`.
  Usually you'll do this.
- As the background image of an absolutely positioned `<div>`.
  This can be handy in situations when you want to take advantage of powerful CSS background properties like `background-size` and `background-position`.

#### props

**All additional props are applied directly to the rendered element** (e.g. `alt`, `id`, `data-*`, `aria-*`).

##### imageId

`string` - (required)

The id of the image to render.
Must correspond with a key in the [appropriate-images configuration].

##### background

`boolean` - Default: `false`

By default, an `<img>` element is rendered.
If this option is `true`, you instead get a `<div>`, absolutely positioned to fill its container, whose `background-image` will be the appropriate image.

##### backgroundPosition

`string` - Default: `center center`

**Only meaningful if `background={true}`.**
Any `background-position` value will do.

##### backgroundSize

`string` - Default: `cover`

**Only meaningful if `background={true}`.**
Any `background-size` value will do.

## Example

```js
const React = require('react');
const appropriateImagesReact = require('@mapbox/appropriate-images-react');
const imageConfig = require('./path/to/my/image-config.js');

const AppropriateImage = appropriateImagesReact(imageConfig);

class MyPage extends React.PureComponent {
  render() {
    return (
      <div>
        <p>An appropriate image will be loaded below:</p>
        <AppropriateImage name="bear" style={{ maxWidth: '100%' }}/>
      </div>
    );
  }
}
```

[appropriate-images]: https://github.com/mapbox/appropriate-images
[appropriate-images configuration]: https://github.com/mapbox/appropriate-images#image-configuration
[appropriate-images-get-url]: https://github.com/mapbox/appropriate-images-get-url
[`scopeAppropriateImage`]: #scopeappropriateimage
