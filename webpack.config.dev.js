// @ts-check

const defaultHost = '0.0.0.0';
const defaultPort = 3000;

// eslint-disable-next-line no-undef
module.exports = {
  entry: './index',
  host: defaultHost,
  port: defaultPort,
  devTool: 'eval-source-map',
  defines: {
    API_URL: 'http://localhost:53880',
    JTW_COOKIE_KEY: '_dev_tk',
  },
  htmlOptions: {
    template: './src/index.html'
  }
};
