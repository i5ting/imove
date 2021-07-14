/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { lessLoader } = require('esbuild-plugin-less');

require('esbuild')
  .build({
    bundle: true,
    entryPoints: [path.join(__dirname, 'template/app.jsx')],
    outfile: path.join(__dirname, 'template/app.bundle.js'),
    plugins: [
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
      lessLoader({
        javascriptEnabled: true,
      }),
    ],
  })
  .then(() => {
    console.log('imove editor builded');
  })
  .catch(() => process.exit(1));
