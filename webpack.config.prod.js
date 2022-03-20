// eslint-disable-next-line no-undef
module.exports = {
  entry: './index',
  definitions: {
    API_URL: 'https://api.yourapp.com',
    JTW_COOKIE_KEY: 'jwt',
  },
  sourceMap: false,
  htmlOptions: {
    template: './src/index.html',
  },
};
