/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');
const { lessLoader } = require('esbuild-plugin-less');

const outfile = path.join(__dirname, 'template/dist/app.bundle.js');

// if builded and NOT force re-build, exit
if (fs.existsSync(outfile) && process.argv.indexOf('--force') < 0) {
  console.log('imove editor alredy builded');
  return;
}

require('esbuild')
  .build({
    bundle: true,
    entryPoints: [path.join(__dirname, 'template/app.jsx')],
    outfile,
    plugins: [
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
