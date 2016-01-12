'use strict'

require('babel-register')({
  plugins: [
    'transform-decorators',
    'transform-async-to-generator',
    'syntax-object-rest-spread',
    'transform-es2015-spread',
    'transform-es2015-modules-commonjs',
    'transform-es2015-parameters'
  ]
})

global.Reflect = require('harmony-reflect')
global.expect = require('chai').expect
global.Support = require('../lib')
