const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BingSchema = new Schema({
  copyright: String,
  copyrightlink: String,
  enddate: String,
  fullstartdate: String,
  hsh: String,
  quiz: String,
  startdate: String,
  url: String,
  urlbase: String,
  title: String,
})
const Bing = mongoose.model('Bing', BingSchema)
module.exports = Bing