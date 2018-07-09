module.exports = {
  server: {
    port: process.env.PORT || 8000,
  },
  cors: {
    origin: 'localhost:8080',
    optionsSuccessStatus: 200
  },
  languages: ['es', 'es-MX', 'en', 'en-US'],
  DB: {
    dataBase: process.env.DB_NAME || 'hloo',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASWOORD || 'hakyn',
    options: {
      dialect: process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
    },
  },
}
