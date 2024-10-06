// craco.config.js
module.exports = {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { loose: false }],
        ["@babel/plugin-proposal-private-methods", { loose: false }],
        ["@babel/plugin-proposal-class-properties", { loose: false }],
      ],
    },
  };
  