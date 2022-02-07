const { uniPostcssPlugin } = require('@dcloudio/uni-cli-shared');

module.exports = {
  plugins: [
    uniPostcssPlugin(),
    require('tailwindcss')(),
    require('postcss-flexbugs-fixes')(),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};
