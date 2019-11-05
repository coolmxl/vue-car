module.exports = {
    devServer: {
      proxy: {
        '/api': {
          // license_plate?access_token=24.ce0d58f8d683e7f5ea234b4e22be7e82.2592000.1570191288.282335-16643891
          target: 'https://aip.baidubce.com', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }

   