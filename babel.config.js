module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        exclude: [
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-transform-regenerator',
        ],
      },
    ],
  ],
  plugins: [
  ],
  overrides: [
    {
      test: './test/**/*',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            exclude: [
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-transform-regenerator',
            ],
          },
        ],
      ],
      plugins: [],
    },
  ],
};
