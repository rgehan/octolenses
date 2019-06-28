module.exports = {
  theme: {
    fontFamily: {
      open: ['Open Sans', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    extend: {
      fontSize: {
        '2xs': '.625rem', // 10px
      },
      inset: {
        '4': '1rem',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'active'],
  },
  plugins: [],
};
