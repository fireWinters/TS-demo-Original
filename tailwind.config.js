module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  theme: {
    extend: {
      colors: {
        animation: {
          'spin-slow': 'spin 2s linear infinite',
        },
      },
    },
  },
};
