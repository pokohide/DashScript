/* 初期設定 */
var system = require('system'),
    args = system.args,
    page = require('webpage').create()

var email = args[1], password = args[2]

page.viewportSize = {
  width: 1920,
  height: 1080
}
page.settings = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
  javascriptEnabled: true,
  loadImages: false
}
phantom.cookiesEnabled = true
phantom.javascriptEnabled = true
page.onInitialized = function() {
  page.evaluate(function() {
    document.addEventListener('DOMContentLoaded', function() {
      window.callPhantom('DOMContentLoaded')
    }, false)
  })
}

var funcs = function(funcs) {
  this.funcs = funcs;
  this.init();
}

funcs.prototype = {
  init: function() {
    var self = this
    page.onCallback = function(data) {
      if (data === 'DOMContentLoaded') self.next()
    }
  },
  next: function() {
    var func = this.funcs.shift()
    console.log('next')
    if (func !== undefined) {
      func()
    } else {
      page.onCallback = function(){}
    }
  }
}

// 順次実行する
new funcs([
  function() {
    console.log('Open Top Page')
    page.open('https://amazon.co.jp', function(status) {
      page.render('visit.png')
    })
  },
  function() {
    console.log('Click Signin Button')
    page.evaluate(function() {
      document.getElementById('nav-link-yourAccount').click()
    })
    page.render('click.png')
  },
  function() {
    console.log('sign in')
    page.evaluate(function(email, password) {
      document.getElementById('ap_email').value = email
      document.getElementById('ap_password').value = password
    }, email, password)

    // setTimeout(function() {
    //   page.evaluate(function() {
    //     document.getElementById('signInSubmit').click()
    //   })
    // }, 1000)

    page.render('signin.js')
    console.log('done')
  },
  function() {
    page.open('https://www.amazon.co.jp/Amazon-co-jp%E9%99%90%E5%AE%9A-%E3%83%9B%E3%82%B0%E3%83%AF%E3%83%BC%E3%83%84MAP%E4%BB%98%E3%81%8D-%E3%83%8F%E3%83%AA%E3%83%BC-%E3%83%9D%E3%83%83%E3%82%BF%E3%83%BC%E3%81%A8%E5%91%AA%E3%81%84%E3%81%AE%E5%AD%90-%E7%AC%AC%E4%B8%80%E9%83%A8-%E7%AC%AC%E4%BA%8C%E9%83%A8-%E7%89%B9%E5%88%A5%E3%83%AA%E3%83%8F%E3%83%BC%E3%82%B5%E3%83%AB%E7%89%88-%E3%83%8F%E3%83%AA%E3%83%BC-%E3%83%9D%E3%83%83%E3%82%BF%E3%83%BC%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA/dp/4863893469/', function(status) {
      page.render('item.png')
    })
    phantom.exit()
  }
]).next();
