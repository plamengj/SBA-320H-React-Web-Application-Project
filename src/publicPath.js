// This dynamically sets the webpack public path so that code splitting works correctly.
// See https://webpack.js.org/guides/public-path/#on-the-fly
if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ = '/SBA-320H-React-Web-Application-Project/';
} 