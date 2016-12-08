require('dotenv').config()

module.exports = {
  AMAZON: {
    EMAIL: process.env.AMAZON_JP_EMAIL,
    PASSWORD: process.env.AMAZON_JP_PASSWORD,
    ITEM: process.env.AMAZON_JP_ITEM_URL
  },
  PRODUCTION: process.env.PRODUCTION
}
