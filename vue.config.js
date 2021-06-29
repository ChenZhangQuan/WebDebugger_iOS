module.exports = {

  devServer: {
    // proxy: 'http://192.168.3.48:5555',
    // proxy: 'http://192.168.33.170:5555'

    proxy: {
      '/api': {
        target: 'http://192.168.33.170:5555'
      },
      '/img': {
        target: 'http://192.168.33.170:5555'
      },
      '/websocket': {
        target: 'http://192.168.33.170:5555',
        ws:'true'

      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Set-Cookie': 'appName=djsupplier;Path=/;'
    },
    // port: 8080,
  }
};
