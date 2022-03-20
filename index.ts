import renderApp from './src';

renderApp();

if (module.hot) {
  module.hot.accept(['./src'], function () {
    renderApp();
  });
}