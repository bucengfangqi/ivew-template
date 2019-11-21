module.exports = {
  publicPath: "data-check", // 讲真的，这里的URL前后两边加不加斜杠都一个样
  outputDir: "dist/data-check", // 不要怕，这里是将资源输出到 dist/data-check 下面
  productionSourceMap: false, // 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  devServer: {
    proxy: {
      "/netbus": {
        target: "http://192.168.0.100:8080"
        // target: "http://192.168.49.184",
      }
    }
  }
};
