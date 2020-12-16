module.exports = {
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              prependData: "@import '@/assets/scss/variables.scss';",
              sassOptions: {
                indentedSyntax: true // optional
              }
            }
          }
        ]
      }
    ]
  }
}
