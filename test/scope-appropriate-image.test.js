'use strict';

import React from 'react';
import { scopeAppropriateImage } from '../src';
import getAppropriateImageUrl from '@mapbox/appropriate-images-get-url';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

jest.mock('@mapbox/appropriate-images-get-url', () => {
  return jest.fn(() => 'the-right-url');
});

describe('scopeAppropriateImage', () => {
  let imageConfig;

  beforeEach(() => {
    imageConfig = {
      bear: {
        basename: 'bear.png',
        sizes: [{ width: 600 }, { width: 1200 }]
      },
      montaraz: {
        basename: 'montaraz.jpg',
        sizes: [
          { width: 600, height: 500 },
          { width: 1200, crop: 'north' },
          { width: 200, height: 200, crop: 'southeast' }
        ]
      },
      osprey: {
        basename: 'osprey.jpg',
        sizes: [{ width: 1200 }, { width: 600, height: 600 }]
      },
      walrus: {
        basename: 'walrus.png',
        sizes: [{ width: 800 }]
      }
    };
  });

  test('defaults render correctly', () => {
    // WrappedComponent so we aren't testing /react-simple-surveyor
    const AppropriateImage = scopeAppropriateImage(imageConfig)
      .WrappedComponent;
    const enzymeWrapper = mount(
      <AppropriateImage
        imageId="bear"
        width={300}
        style={{ maxWidth: '100%' }}
        alt="A bear"
        aria-hidden={true}
      />
    );
    expect(mountToJson(enzymeWrapper)).toMatchSnapshot();
  });

  test('defaults call getAppropriateImageUrl correctly', () => {
    const AppropriateImage = scopeAppropriateImage(imageConfig)
      .WrappedComponent;
    mount(<AppropriateImage imageId="bear" width={300} />);
    expect(getAppropriateImageUrl).toHaveBeenCalledTimes(1);
    expect(getAppropriateImageUrl).toHaveBeenCalledWith({
      imageId: 'bear',
      availableWidth: 300,
      imageConfig,
      hiResRatio: 1.3
    });
  });

  test('non-background image with non-default options renders correctly', () => {
    const AppropriateImage = scopeAppropriateImage(imageConfig, {
      hiResRatio: 1.5,
      transformUrl: x => `/path/to/images/${x}`
    }).WrappedComponent;
    const enzymeWrapper = mount(
      <AppropriateImage
        imageId="bear"
        width={300}
        style={{ maxWidth: '100%' }}
        alt="A bear"
        aria-hidden={true}
      />
    );
    expect(mountToJson(enzymeWrapper)).toMatchSnapshot();
  });

  test('non-background image with non-default options calls getAppropriateImageUrl correctly', () => {
    const AppropriateImage = scopeAppropriateImage(imageConfig, {
      hiResRatio: 1.5,
      transformUrl: x => `/path/to/images/${x}`
    }).WrappedComponent;
    mount(<AppropriateImage imageId="osprey" width={450} />);
    expect(getAppropriateImageUrl).toHaveBeenCalledTimes(1);
    expect(getAppropriateImageUrl).toHaveBeenCalledWith({
      imageId: 'osprey',
      availableWidth: 450,
      imageConfig,
      hiResRatio: 1.5
    });
  });

  test('background image with default options renders correctly', () => {
    const AppropriateImage = scopeAppropriateImage(imageConfig)
      .WrappedComponent;
    const enzymeWrapper = mount(
      <AppropriateImage
        imageId="bear"
        width={300}
        alt="A bear"
        aria-hidden={true}
        background={true}
      />
    );
    expect(mountToJson(enzymeWrapper)).toMatchSnapshot();
  });

  test('background image with non-defaults renders correctly', () => {
    const AppropriateImage = scopeAppropriateImage(imageConfig)
      .WrappedComponent;
    const enzymeWrapper = mount(
      <AppropriateImage
        imageId="bear"
        width={300}
        alt="A bear"
        style={{ maxHeight: 500 }}
        aria-hidden={true}
        background={true}
        backgroundPosition="top left"
        backgroundSize="contain"
      />
    );
    expect(mountToJson(enzymeWrapper)).toMatchSnapshot();
  });
});
