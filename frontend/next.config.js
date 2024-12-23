const path = require('path');

module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_APP_API_URL: process.env.APP_API_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/src')],
  },
};
