import React from 'react';
import PropTypes from 'prop-types';
import survey from '@mapbox/react-simple-surveyor';
import getAppropriateImageUrl from '@mapbox/appropriate-images-get-url';

function scopeAppropriateImage(imageConfig, options) {
  options = options || {};
  const transformUrl = options.transformUrl !== undefined
    ? options.transformUrl
    : x => x;
  const hiResRatio = options.hiResRatio !== undefined
    ? options.hiResRatio
    : 1.3;

  class AppropriateImage extends React.PureComponent {
    render() {
      let url = getAppropriateImageUrl({
        imageId: this.props.imageId,
        width: this.props.width,
        imageConfig,
        hiResRatio
      });
      url = transformUrl(url);

      const elementProps = Object.keys(this.props).reduce((result, key) => {
        // All prop types we don't want to pass to the element should fail this condition.
        if (
          !/^(imageId|width|background|backgroundPosition|backgroundSize)$/.test(
            key
          )
        ) {
          result[key] = this.props[key];
        }
        return result;
      }, {});

      if (!this.props.background) {
        return <img src={url} {...elementProps} />;
      }

      const backgroundStyle = {
        backgroundImage: `url("${url}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: this.props.backgroundPosition,
        backgroundSize: this.props.backgroundSize,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
      if (elementProps.style) {
        Object.keys(elementProps.style).forEach(key => {
          backgroundStyle[key] = elementProps.style[key];
        });
        delete elementProps.style;
      }
      return <div {...this.props.imageProps} style={backgroundStyle} />;
    }
  }

  AppropriateImage.propTypes = {
    imageId: PropTypes.string.isRequired,
    background: PropTypes.bool,
    backgroundPosition: PropTypes.string,
    backgroundSize: PropTypes.string,
    // Provided by survey
    width: PropTypes.number.isRequired
  };

  AppropriateImage.defaultProps = {
    background: false,
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };

  return survey(AppropriateImage);
}

export { scopeAppropriateImage };
