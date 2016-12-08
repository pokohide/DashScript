const fs = require('fs'),
      system = require('system'),
      args = system.args
var page = require('webpage').create()

class DashScirpt {
  constructor(args) {
    this.init()
    this.email = args[1]
    this.password = args[2]
    this.item = args[3]
    this.funcs = [
      this.visit,
      this.clickSignInButton//,
      //this.signIn,
      //this.openItemPage,
      //this.addToCart
    ]
  }

  init() {
    page.viewportSize = {width: 1920, height: 1080}
    page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    page.settings.javascriptEnabled = true
    page.settings.loadImages = false
    phantom.cookiesEnabled = true
    phantom.javascriptEnabled = true

    page.onCallback = (data) => {
      if(data === 'DOMContentLoaded') this.next()
    }

    page.onInitialized = () => {
      page.evaluate(() => {
        document.addEventListener('DOMContentLoaded', () => {
          window.callPhantom('DOMContentLoaded')
        }, false)
      })
    }
  }

  /* STEP1: サイトに訪れる */
  visit() {
    console.log('Open Top Page')
    page.open('https://amazon.co.jp', (status) => {
      page.render('visit.png')
    })
  }

  /* STEP:2 ログインボタンをクリック */
  clickSignInButton() {
    console.log('Click Signin Button')
    page.evaluate(() => {
      console.log('hoge')
      document.getElementById('nav-link-yourAccount').click()
      page.render('click.png')
      phantom.exit()
    })
  }

  /* STEP3: ログインする */
  signIn() {
    console.log('sign in')
    this.page.render('signin.png')
    this.page.evaluate((email, password) => {
      document.getElementById('ap_email').value = email
      document.getElementById('ap_password').value = password
      document.getElementById('signInSubmit').submit()
    }, this.email, this.password)
  }

  /* STEP4: open Item Page */
  openItemPage() {
    console.log('open item page')
    this.page.render('item.png')
    this.page.open('https://www.amazon.co.jp/Amazon-W87CUN-Fire-TV-Stick/dp/B00ZVNYLS8/', (status) => {})
  }

  /* STEP5: add to cart */
  addToCart() {
    console.log('add to cart')
    this.page.render('cart.png')
    this.page.evaluate(() => {
      document.getElementById('add-to-cart-button').click()
    })
  }

  /* STEP6: 支払いページへ */
  payment() {
    console.log('Proceed to Payment')
    this.page.render('payment.png')
    this.page.open('https://www.amazon.co.jp/gp/buy/spc/handlers/display.html', (status) => {})
  }

  run() {
    this.func = this.funcs.shift()
    this.func()
  }

  next() {
    this.func = this.funcs.shift()
    if(this.func !== undefined) {
      this.func()
    } else {
      page.onCallback = function(){}
    }    
  }
}

const d = new DashScirpt(args)
d.run()

