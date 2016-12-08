'use strict'

const config = require('./config')

const path = require('path')
const childProcess = require('child_process')

class PhantomCaller {
  constructor() {
    this.args = [
      path.join(__dirname, 'dash-script.js'),
      config.AMAZON.EMAIL,
      config.AMAZON.PASSWORD,
      config.AMAZON.ITEM_URL
    ]

    this.path = config.PRODUCTION === 'true' ?
      path.join(__dirname, 'phantomjs') :
      'phantomjs'
  }

  call() {
    console.log(`Calling Phantom: ${this.path}`)

    this.process = childProcess.execFile(this.path, this.args)
    this.process.stdout.on('data', (data) => {
      console.log(`[phantom info] ${data}`)
    })
    this.process.stderr.on('data', (data) => {
      console.log('[phantom error] ${data}')
    })
    this.process.on('exit', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
}

const caller = new PhantomCaller()
caller.call()
