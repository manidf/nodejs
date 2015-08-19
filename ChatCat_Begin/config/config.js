module.exports = require('./' + (process.env.NODE_ENV || 'development') + '.json');

// in $ set NODE_ENV=production or set NODE_ENV=development