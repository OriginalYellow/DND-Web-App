module.exports = {
    "extends": "airbnb-base",
    env: {
        node: true,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 'off',
        'no-unused-variables': 'off',
      },
};