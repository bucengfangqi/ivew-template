module.exports = {
  devServer: {
    proxy: {
      "/netbus": {
        target: "http://192.168.0.100:8080",
        // target: "http://192.168.49.184",
      }
    }
  }
};
