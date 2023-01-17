/*
 * Inital functions execer handler
 * @param modules
 */
const handleExecer = (modules) => {
  Object.keys(modules).forEach((item) => {
    const f = modules[item];
    if (typeof f === 'function') f();
  });
};

/**
 * './modules' import directory
 * true subdirectories
 * /\.js$/ match the suffix for 'js' file
 */
const files = require.context('./modules', true, /\.js$/);
const modules = files.keys().reduce((module, path) => {
  const name = path.replace(/^\.\/|.js$/g, '');
  module[name] = files(path).default;
  return module;
}, {});

handleExecer(modules);

(($) => {
  const $body = $('body');

  if ($body.hasClass('path-example-page')) {
    import(/* webpackChunkName: 'example_page' */ './pages/example');
  }
})(jQuery);
