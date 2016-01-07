'use strict'

require('babel-register')({
  presets: ['es2015'],
  plugins: ['transform-decorators']
})

global.Reflect = require('harmony-reflect')
global.expect = require('chai').expect
global.Record = require('../lib')
