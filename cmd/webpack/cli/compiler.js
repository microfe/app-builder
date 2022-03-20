#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const webpack = require('webpack');
const chalk = require('chalk');
const Table = require('cli-table3');
const colors = require('colors');

function showEmojiConditionally(emoji) {
  if (process.stdout.isTTY && !(process.platform === 'darwin')) {
    return emoji;
  } else {
    return '';
  }
}

function generateOutput(outputOptions, stats, statsErrors) {
  if (outputOptions.version) {
    console.log(`  🌏 webpack v.${webpack.version}`);
    process.exit(0);
  }
  const statsObj = stats.toJson(outputOptions);

  if (statsErrors && statsErrors.length) {
    statsErrors.forEach((err) => {
      if (err.loc) process.cliLogger.warn(err.loc);
      if (err.name) {
        process.cliLogger.error(err.name);
        console.log('\n');
      }
    });

    return statsObj;
  }

  const { assets, time, builtAt, warnings, outputPath } = statsObj;
  const emojies = ['✅ ', '🌏', '⚒️', '⏱', '📂'];
  const visibleEmojies = emojies.map((e) => showEmojiConditionally(e));

  console.log(
    ` ${visibleEmojies[0]} ${chalk.underline.bold('Compilation Results')}\n`
  );
  console.log(` Webpack v${webpack.version}`);
  console.log(` Built ${new Date(builtAt).toString()}`);
  console.log(` Compile Time ${time}ms`);
  console.log(` Output Directory: ${outputPath}`);

  const table = new Table({
    head: [
      colors.bold(colors.blue('Status')),
      colors.bold(colors.blue('Bundle')),
      colors.bold(colors.blue('Size'))],
    colWidths: [10, 45, 10],
    colAligns:['left', 'left', 'right'],
    style: { compact: true, 'padding-left': 1 },
  });

  let compilationTableEmpty = true;

  assets.forEach((asset) => {
    const kbSize = Math.round(asset.size / 1000);

    const fileSize = `${kbSize} kb`;

    const hasBeenCompiled = asset.emitted === true
      ? colors.green('emitted')
      : colors.grey('ignored');

    table.push([
      hasBeenCompiled,
      asset.emitted ? asset.name : colors.grey(asset.name),
      asset.isOverSizeLimit
        ? colors.yellow(fileSize)
        : asset.emitted ? fileSize : colors.grey(fileSize)
    ]);

    compilationTableEmpty = false;
  });

  if (!compilationTableEmpty) {
    console.log(table.toString());
  }

  warnings.forEach((warning) => {
    process.cliLogger.warn(warning.message);
    console.log('\n');
  });

  return statsObj;
}

async function invokeCompilerInstance(
  compiler,
  lastHash,
  options,
  outputOptions
) {
  return new Promise((resolve) => {
    return compiler.run(async function (err, stats) {
      const content = await compilerCallback(
        compiler,
        err,
        stats,
        lastHash,
        options,
        outputOptions
      );
      resolve(content);
    });
  });
}

async function invokeWatchInstance(
  compiler,
  lastHash,
  options,
  outputOptions,
  watchOptions
) {
  return compiler.watch(watchOptions, function (err, stats) {
    return compilerCallback(
      compiler,
      err,
      stats,
      lastHash,
      options,
      outputOptions
    );
  });
}

function compilerCallback(
  compiler,
  err,
  stats,
  lastHash,
  options,
  outputOptions
) {
  let statsErrors = [];
  const stdout = options.silent
    ? {
      write: () => { return; },
    }
    : process.stdout;

  if (!outputOptions.watch || err) {
    // Do not keep cache anymore
    compiler.purgeInputFileSystem();
  }

  if (err) {
    lastHash = null;
    process.cliLogger.error(err.stack || err);
    process.exit(1);
  }

  if (outputOptions.json) {
    stdout.write(JSON.stringify(stats.toJson(outputOptions), null, 2) + '\n');
  } else if (stats.hash !== lastHash) {
    lastHash = stats.hash;

    if (stats.compilation && stats.compilation.errors.length !== 0) {
      const errors = stats.compilation.errors;
      errors.forEach((statErr) => {
        statsErrors.push({ name: statErr.message, loc: statErr.file });
      });
    }

    return generateOutput(outputOptions, stats, statsErrors);
  }

  if (!outputOptions.watch && stats.hasErrors()) {
    process.exitCode = 2;
  }
}

module.exports = async function (opts, shouldUseMem) {
  const { outputOptions, processingErrors, options } = opts;
  if (outputOptions.color) {
    require('supports-color').stdout;
    outputOptions.color = true;
  }

  if (outputOptions.help) {
    console.log(outputOptions.help);
    console.log('\n                  Made with ♥️  by the webpack team \n');
    return;
  }

  if (processingErrors.length > 0) {
    throw new Error(processingErrors);
  }

  const compiler = await webpack(options);
  let lastHash = null;

  const ProgressPlugin = webpack.ProgressPlugin;
  const progressPluginExists = options.plugins
    ? options.plugins.find((p) => p instanceof ProgressPlugin)
    : false;

  if (progressPluginExists) {
    options.plugins = options.plugins.filter((e) => e !== progressPluginExists);
  }

  if (outputOptions.interactive) {
    const interactive = require('webpack-cli/lib/utils/interactive');
    return interactive(options, outputOptions, processingErrors, shouldUseMem);
  }

  compiler.hooks.beforeRun.tap('webpackProgress', (compilation) => {
    if (outputOptions.progress) {
      let tmp_msg;
      const defaultProgressPluginHandler = (percent, msg, addInfo) => {
        percent = Math.floor(percent * 100);
        if (percent === 100) {
          msg = 'Compilation completed';
        }

        if (msg && tmp_msg != msg) {
          process.cliLogger.info(percent + '% ' + msg);
        }
        tmp_msg = msg;
      };

      if (!progressPluginExists) {
        new ProgressPlugin(defaultProgressPluginHandler).apply(compiler);
      }
      else {
        if (!progressPluginExists.handler) {
          options.plugins = options.plugins.filter(
            (e) => e !== progressPluginExists
          );
          Object.keys(progressPluginExists).map((opt) => {
            ProgressPlugin.defaultOptions[opt] = progressPluginExists[opt];
          });
          new ProgressPlugin(defaultProgressPluginHandler).apply(compiler);
        } else {
          progressPluginExists.apply(compiler);
        }
      }
    }
  });

  if (outputOptions.infoVerbosity === 'verbose') {
    if (outputOptions.watch) {
      compiler.hooks.watchRun.tap('WebpackInfo', (compilation) => {
        const compilationName = compilation.name ? compilation.name : '';
        process.cliLogger.info('Compilation ' + compilationName + ' starting…');
      });
    } else {
      compiler.hooks.beforeRun.tap('WebpackInfo', (compilation) => {
        const compilationName = compilation.name ? compilation.name : '';
        process.cliLogger.info('Compilation ' + compilationName + ' starting…');
      });
    }

    compiler.hooks.done.tap('WebpackInfo', (compilation) => {
      const compilationName = compilation.name ? compilation.name : '';
      process.cliLogger.info('Compilation ' + compilationName + ' finished');
    });
  }

  if (outputOptions.watch) {
    const watchOptions = outputOptions.watchOptions || {};
    if (watchOptions.stdin) {
      process.stdin.on('end', function (_) {
        process.exit(); // eslint-disable-line
      });
      process.stdin.resume();
    }

    await invokeWatchInstance(
      compiler,
      lastHash,
      options,
      outputOptions,
      watchOptions
    );

    if (outputOptions.infoVerbosity !== 'none')
      process.cliLogger.info('watching the files...');
  } else {
    return await invokeCompilerInstance(
      compiler,
      lastHash,
      options,
      outputOptions
    );
  }
};
