const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 9000
  },
  client:{
    urlSchema: 'http',
    host: 'localhost',
    port: 3000
  },
  database: {
    url: `mongodb://${host}/freelance-dev`,
    properties: {
      useNewUrlParser: true
    }
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInMinutes: 1440
  },
  mailer: {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth:{
      user: '',
      pass: ''
    }
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10
  }
};
