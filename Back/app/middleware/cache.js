const getExpedditiousCache = require('express-expeditious');

const defaultOptions = {
  namespace: 'expresscache',
  defaultTtl: '1 minute',
  statusCodeExpires:{
    404: '5 minutes',
    500: 0
  }
}

const cacheInit = getExpedditiousCache(defaultOptions)

module.exports = {cacheInit}
