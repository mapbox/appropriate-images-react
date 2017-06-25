'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const survey = require('@mapbox/react-simple-surveyor');
const getAppropriateImageUrl = require('@mapbox/appropriate-images/browser/get-appropriate-image-url');

class AppropriateImage extends React.PureComponent {
  render() {
    const url = getAppropriateImageUrl({
      imageId: this.props.imageId,
      width: this.props.width,
      imageConfig: this.props.imageConfig,
      hiResRatio: this.props.hiResRatio,
      imageDirectory: this.props.imageDirectory
    });
    return <img src={url} {...this.props.imageProps} />;
  }
}

AppropriateImage.propTypes = {
  imageId: PropTypes.string.isRequired,
  imageConfig: PropTypes.object.isRequired,
  imageDirectory: PropTypes.string,
  hiResRatio: PropTypes.number,
  imageProps: PropTypes.object,
  // Provided by survey
  width: PropTypes.number.isRequired
};

module.exports = survey(AppropriateImage);
