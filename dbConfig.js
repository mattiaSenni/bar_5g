const  config = {
    user:  'sa',
    password:  'burbero2020',
  server:  '10.1.0.18', // 'PC0118' // '10.1.0.18' // '192.168.43.48' // '192.168.1.229'
    database:  'Bar_5G',
    options: {
      trustedconnection:  true,
      trustServerCertificate: true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'
    },
    port:  1433
  }
  
  module.exports = config;  