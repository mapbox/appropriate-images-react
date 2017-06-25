'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const survey = require('@mapbox/react-simple-surveyor');
const getAppropriateImageUrl = require('@mapbox/appropriate-images/browser/get-appropriate-image-url');
const imageConfig = require('./image-config');

class FileLoaderAppropriateImage extends React.PureComponent {
  render() {
    // Do not pass an imageDirectory, so we can just append the basename
    // to a require statement.
    const url = getAppropriateImageUrl({
      imageId: this.props.imageId,
      width: this.props.width,
      imageConfig,
      hiResRatio: 1.3
    });
    const webpackUrl = require(`./images/optimized/${url}`);
    return <img src={webpackUrl} {...this.props.imageProps} />;
  }
}

FileLoaderAppropriateImage.propTypes = {
  imageId: PropTypes.string.isRequired,
  imageProps: PropTypes.object,
  // Provided by survey
  width: PropTypes.number.isRequired
};

module.exports = survey(FileLoaderAppropriateImage);
