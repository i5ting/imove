#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');
const { lessLoader } = require('esbuild-plugin-less');

// build @imove/core first, if in imove repo
const CORE_DIR = path.join(__dirname, '../../../../core');
if (fs.pathExistsSync(CORE_DIR)) {
  require('child_process').execSync(`cd ${CORE_DIR} && rollup -c`);
}

// build js and css for editor
const OUT_FILE = path.join(__dirname, 'template/dist/app.bundle.js');
require('esbuild')
  .build({
    bundle: true,
    entryPoints: [path.join(__dirname, 'template/app.jsx')],
    outfile: OUT_FILE,
    plugins: [
      {
        name: 'resolve-multi-react',
        setup: (build) => {
          build.onResolve({ filter: /^react$/, namespace: 'file' }, () => {
            return {
              path: require.resolve('react'),
              watchFiles: undefined,
            };
          });
        },
      },
      // fix import('antd/dist/antd.less')
      {
        name: 'resolve-antd-dist-less',
        setup: (build) => {
          build.onResolve(
            { filter: /antd\/dist\/antd\.less$/, namespace: 'file' },
            () => {
              return {
                path: '',
                watchFiles: undefined,
              };
            },
          );
        },
      },
      // less
      lessLoader({
        javascriptEnabled: true,
      }),
    ],
  })
  .then(() => {
    console.log('imove editor builded');
  })
  .catch(() => process.exit(1));
