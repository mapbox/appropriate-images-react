'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const survey = require('@mapbox/react-simple-surveyor');
const getAppropriateImageUrl = require('@mapbox/appropriate-images/browser/get-appropriate-image-url');

class AppropriateBackgroundImage extends React.PureComponent {
  render() {
    const url = getAppropriateImageUrl({
      imageId: this.props.imageId,
      width: this.props.width,
      imageConfig: this.props.imageConfig,
      hiResRatio: this.props.hiResRatio,
      imageDirectory: this.props.imageDirectory
    });
    const style = {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: this.props.backgroundPosition,
      backgroundSize: this.props.backgroundSize,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
    if (this.props.imageProps && this.props.imageProps.style) {
      Object.assign(style, this.props.imageProps.style);
    }
    return <div style={style} {...this.props.imageProps} />;
  }
}

AppropriateBackgroundImage.propTypes = {
  imageId: PropTypes.string.isRequired,
  imageConfig: PropTypes.object.isRequired,
  imageDirectory: PropTypes.string,
  hiResRatio: PropTypes.number,
  imageProps: PropTypes.object,
  backgroundPosition: PropTypes.string,
  backgroundSize: PropTypes.string,
  // Provided by survey
  width: PropTypes.number.isRequired
};

AppropriateBackgroundImage.defaultProps = {
  backgroundPosition: 'center center',
  backgroundSize: 'cover'
};

module.exports = survey(AppropriateBackgroundImage);
