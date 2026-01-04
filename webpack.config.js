const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
  },
  mode: "development",
  output: {
    filename: "js/[name].js",                // 컴파일된 JS 파일명
    path: path.resolve(__dirname, "assets", "js"), // JS 출력 폴더
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,  // SCSS를 별도의 CSS 파일로 추출
          "css-loader",
          "sass-loader"
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/styles.css",    // 컴파일된 CSS 파일명 및 경로
    }),
  ],
};
