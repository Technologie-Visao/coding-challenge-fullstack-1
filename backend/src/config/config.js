// set default values for env variables
const config = {
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
}

module.exports = config
