module.exports = {
  // entry: './src/main.js',
  // output: {
  //   path: 'dist',
  //   filename: 'js/bundle.js'
  // },
  // /* vue-cli 配置代理的配置参数： */
  devServer: {
    proxy: {
      // 代理规则
      "/api": {
        // 代理的目标服务器地址
        target: "http://m.beequick.cn/data/",
        // https请求需要该设置
        secure: false,
        // 必须设置该项
        changeOrigin: false,
        // 将 '/api' 替换成 ''
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
