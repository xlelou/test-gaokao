const mongoose = require('mongoose')
const config = require('../config.json')
mongoose.Promise =global.Promise;
mongoose.connect(config.database);
const db = mongoose.connection;

db.once('open',()=>{
    'use strict';
    console.log(1)
    console.log('db connect!');
})

db.on('error', () => {
    'use strict';
    console.log('db connect error');
})

module.exports = mongoose;