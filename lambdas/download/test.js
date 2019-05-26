const { handler } = require('./index.js');

const event = {
  magnetLink: 'magnet:?xt=urn:btih:179f2bdffc317bc5596b339d1deda8bafcf830a4&dn=The.Bourne.Ultimatum.2007.1080p.BluRay.x264.DTS-FGT&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce',
  fileName: 'The Bourne Ultimatum (2007)',
};


handler(event);
