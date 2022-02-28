const  config = {
    user:  'sa',
    password:  'burbero2020',
    server:  '10.1.0.19', // 'PC0152'
    database:  'Teatro_5G',
    options: {
      trustedconnection:  true,
      trustServerCertificate: true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'
    },
    port:  1433
  }
  
  module.exports = config;