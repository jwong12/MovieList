import { AngularCompilerPlugin } from '@ngtools/webpack';
 
exports = { /* ... */
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      }
    ]
  },
 
  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: 'path/to/tsconfig.json',
      entryModule: 'path/to/app.module#AppModule',
      sourceMap: true,
      i18nInFile: 'path/to/translations.en.xlf',
      i18nInFormat: 'xlf',
      i18nOutFile: 'path/to/translations.xlf',
      i18nOutFormat: 'xlf',
      locale: 'en',
      hostReplacementPaths: {
        'path/to/config.development.ts': 'path/to/config.production.ts'
      }
    })
  ]
};