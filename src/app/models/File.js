const Base = require('./Base');
const db = require('../../config/db')

Base.init({table: 'files'})

module.exports = {
   ...Base,
}
