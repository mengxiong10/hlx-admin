'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"sit"',
    BASE_API: '"https://cqzcloud.com/qxb-admin"'
})