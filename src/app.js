'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const imageConfig = require('./image-config');
const AppropriateImage = require('./appropriate-image');
const ScopedAppropriateImage = require('./scoped-appropriate-image');
const FileLoaderAppropriateImage = require('./file-loader-appropriate-image');
const AppropriateBackgroundImage = require('./appropriate-background-image');

class ManualTest extends React.Component {
  render() {
    return (
      <div>
        <div style={{ marginBottom: 100 }}>
          <AppropriateImage
            imageConfig={imageConfig}
            imageId="bear"
            imageDirectory="src/images/optimized"
            imageProps={{ style: { maxWidth: '100%' } }}
          />
        </div>
        <div style={{ marginBottom: 100 }}>
          <ScopedAppropriateImage
            imageId="montaraz"
            imageProps={{ style: { maxWidth: '100%' } }}
          />
        </div>
        <div style={{ marginBottom: 100 }}>
          <FileLoaderAppropriateImage
            imageId="osprey"
            imageProps={{ style: { maxWidth: '100%' } }}
          />
        </div>
        <div style={{ marginBottom: 100 }}>
          <ScopedAppropriateImage
            imageId="walrus"
            imageProps={{ style: { maxWidth: '100%' } }}
          />
        </div>
        <div
          style={{
            marginBottom: 100,
            height: 300,
            width: 800,
            maxWidth: '100%',
            position: 'relative'
          }}
        >
          <AppropriateBackgroundImage
            imageConfig={imageConfig}
            imageId="bear"
            imageDirectory="src/images/optimized"
          />
        </div>
      </div>
    );
  }
}

const c = document.createElement('div');
document.body.appendChild(c);
ReactDOM.render(<ManualTest />, c);
