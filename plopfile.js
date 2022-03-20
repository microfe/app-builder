/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const sourceDir = './src';
const templateDir = '.templates';

const getModuleList = function () {
  const modules = [];

  fs.readdirSync(sourceDir).forEach(file => {
    const filePath = path.join(sourceDir, file);
    const isDir = fs.statSync(filePath).isDirectory();

    if (!isDir) {
      return;
    }

    const isModule = file.startsWith('_') == false;
    if (!isModule) {
      return;
    }

    modules.push(file);
  });

  return modules;
};

const getModuleLayoutList = function (moduleDir) {
  const layouts = [];
  const baseDir = `${sourceDir}/${moduleDir}/layouts`;
  fs.readdirSync(baseDir).forEach(file => {
    const filePath = path.join(baseDir, file);
    const isFile = fs.statSync(filePath).isFile();

    if (!isFile) {
      return;
    }

    const isLayout = file.endsWith('Layout.tsx');
    if (!isLayout) {
      return;
    }

    layouts.push(file.replace('.tsx', ''));
  });

  return layouts;
};

const setModuleHelpers = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setHelper('moduleLayout', (name) => {
    return `${plop.getHelper('pascalCase')(name)}Layout`;
  });

  plop.setHelper('moduleLayoutBody', (name) => {
    return `${plop.getHelper('moduleLayout')(name)}Body`;
  });

  plop.setHelper('moduleLayoutHeader', (name) => {
    return `${plop.getHelper('moduleLayout')(name)}Header`;
  });

  plop.setHelper('moduleLayoutFooter', (name) => {
    return `${plop.getHelper('moduleLayout')(name)}Footer`;
  });

  plop.setHelper('modulePath', (name) => {
    return `${plop.getHelper('camelCase')(name)}Path`;
  });

  plop.setHelper('moduleContext', (name) => {
    return `${plop.getHelper('pascalCase')(name)}Context`;
  });

  plop.setHelper('moduleContextInterface', (name) => {
    return `I${plop.getHelper('moduleContext')(name)}Value`;
  });
};

const setPageHelpers = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setHelper('pageName', (name) => {
    if (name.toLowerCase().endsWith('page')) {
      return `${plop.getHelper('pascalCase')(name)}`;
    }

    return `${plop.getHelper('pascalCase')(name)}Page`;
  });
  plop.setHelper('pagePath', (name) => {
    return plop.getHelper('camelCase')(`${plop.getHelper('pageName')(name)}Path`);
  });
};

const setModuleGenerator = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator('module', {
    description: 'create new app module',
    prompts: [{
      type: 'input',
      name: 'module',
      message: 'module name please'
    }],
    actions: [{
      type: 'addMany',
      destination: 'src/{{module}}/',
      templateFiles: `${templateDir}/module/**/*`,
      base: `${templateDir}/module`
    }]
  });
};

const setPageGenerator = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  const moduleList = getModuleList();

  plop.setGenerator('page', {
    description: 'create new page',
    prompts: [{
      type: 'list',
      name: 'moduleDir',
      choices: moduleList,
      message: 'select module'
    }, {
      type: 'list',
      name: 'layoutFile',
      choices: (answers) => {
        return getModuleLayoutList(answers.moduleDir);
      },
      message: 'select layout'
    }, {
      type: 'input',
      name: 'page',
      message: 'page name',
      validate: (input) => !!input
    }],
    actions: [{
      type: 'add',
      path: `${sourceDir}/{{moduleDir}}/pages/{{kebabCase page}}/{{pageName page}}.tsx`,
      templateFile: `${templateDir}/page/Page.tsx.hbs`
    }, {
      type: 'add',
      path: `${sourceDir}/{{moduleDir}}/pages/{{kebabCase page}}/{{pageName page}}.shared.ts`,
      templateFile: `${templateDir}/page/Page.shared.ts.hbs`
    }, {
      type: 'add',
      path: `${sourceDir}/{{moduleDir}}/pages/{{kebabCase page}}/index.ts`,
      templateFile: `${templateDir}/page/index.ts.hbs`
    }, {
      type: 'add',
      path: `${sourceDir}/{{moduleDir}}/pages/{{kebabCase page}}/components/index.ts`,
      templateFile: `${templateDir}/page/components/index.ts.hbs`
    }, {
      type: 'modify',
      path: `${sourceDir}/{{moduleDir}}/pages/index.ts`,
      templateFile: `${templateDir}/page/entry.hbs`,
      pattern: /\];/gm
    }]
  });
};

/* eslint-disable no-undef */
module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  setModuleHelpers(plop);
  setPageHelpers(plop);

  setModuleGenerator(plop);
  setPageGenerator(plop);
};