'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const survey = require('@mapbox/react-simple-surveyor');
const getAppropriateImageUrl = require('@mapbox/appropriate-images/browser/get-appropriate-image-url');
const imageConfig = require('./image-config');

class ScopedAppropriateImage extends React.PureComponent {
  render() {
    const url = getAppropriateImageUrl({
      imageId: this.props.imageId,
      width: this.props.width,
      imageConfig,
      hiResRatio: 1.3,
      imageDirectory: '/src/images/optimized/'
    });
    return <img src={url} {...this.props.imageProps} />;
  }
}

ScopedAppropriateImage.propTypes = {
  imageId: PropTypes.string.isRequired,
  imageProps: PropTypes.object,
  // Provided by survey
  width: PropTypes.number.isRequired
};

module.exports = survey(ScopedAppropriateImage);
