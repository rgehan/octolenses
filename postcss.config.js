const tailwindcss = require('tailwindcss');

// prettier-ignore
module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer'),
  ],
};
