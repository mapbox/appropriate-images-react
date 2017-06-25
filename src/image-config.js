'use strict';

module.exports = {
  bear: {
    basename: 'bear.png',
    sizes: [{ width: 300 }, { width: 600 }]
  },
  montaraz: {
    basename: 'montaraz.jpg',
    sizes: [
      { width: 300, height: 500 },
      { width: 1200, crop: 'north' },
      { width: 200, height: 200, crop: 'southeast' },
      { width: 210, height: 210, crop: 'northwest' }
    ]
  },
  osprey: {
    basename: 'osprey.jpg',
    sizes: [{ width: 600 }, { width: 300, height: 300 }]
  },
  walrus: {
    basename: 'walrus.png',
    sizes: [{ width: 400 }]
  }
};
