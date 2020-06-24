const Bing = require('../models/bing')
class BingClass {
  constructor () {

  }
  save (info) {
    console.log(info)
    info.url = 'http://bing.shanch.cn/' + info.hsh
    Bing.findOne({ hsh: info.hsh }, (err, result) => {
      if (!result) {
        Bing.create(info)
      }
      // console.log(err, response)
    })
  }
}

module.exports = new BingClass()