# @mapbox/appropriate-images-react

**Examples** showing how to use the resized, optimized images that you generated with [appropriate-images](https://github.com/mapbox/appropriate-images) in React.

*With the same configuration, you can generate resized, optimized images and then select the right one to render in the browser, according to the available width.*

These components
- measure their available width with [react-simple-surveyor](https://github.com/mapbox/react-simple-surveyor);
- combine that width with your image configuration to get a URL, using [`getAppropriateImageUrl`](https://github.com/mapbox/appropriate-images#getappropriateimageurl);
- then render the appropriate size-variant of their image.

## How to start?

Install the dependencies, then `npm start`.

## What is exemplified?

- `AppropriateImage` is very a generic component that illustrates the basic, abstract use-case.
  It expects a lot of information whenever it's used.
- `ScopedAppropriateImage` is like `AppropriateImage` but with `imageConfig`, `imageDirectory`, and `hiResRatio` pre-determined.
  It is easier to use repeatedly: all you really need to provide for each instance is an `imageId`.
- `FileLoaderAppropriateImage` is like `ScopedAppropriateImage` but for use with Webpack's file-loader.
  When you use `file-loader`, you shouldn't presume to know exactly what the filename of the image will be at runtime: instead, you should `require` the image and let Webpack handle it from there.
  The `require` statement *needs to begin with a string literal that scopes it to your images directory* — and only *you* can provide that string literal.
  (This component illustrates why it's probably better to use these examples to create your own component than to use a pre-packaged one.)
- `AppropriateBackgroundImage` shows one way you might use appropriate-images in combination with CSS `background-image`.
  The `background-position` and `background-size` properties in CSS can be very convenient at times (much more so than doing similar work in JS); so take advantage of them.

## Why not an npm package?

Since appropriate-images provides [`getAppropriateImageUrl`](https://github.com/mapbox/appropriate-images#getappropriateimageurl), which does the heavy lifting, the components exemplified here don't do very much, really.
And what they *do* do is better if tailored to your specified environment.

For example, the `ScopedAppropriateImage` component is much easier to use than the generic `AppropriateImage` component, because you don't have to feed in the `imageConfig` and `imageDirectory` (and maybe a custom `hiResRatio`) every time you use it.

The `FileLoaderAppropriateImage` component exemplifies how you can work with Webpack's file-loader, to get image URLs — *essential* if you rely on that tool, but not at all packageable into a cross-project component.

For reasons like that above, **I suggest using these examples to help you create your own `AppropriateImage` component that is tailored to your specified environment** and makes it as easy as possible to use.
