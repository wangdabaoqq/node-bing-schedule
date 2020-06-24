// const screenshot = require('screenshot-desktop')
// const nodemailer = require('nodemailer')
var mongoose = require('mongoose');
const schedule = require('node-schedule')
const request = require('request')
const bingClass = require('./controller/bing')
// const fs = require('fs')
const qiniu = require('qiniu')
const bucket = 'live-bing';
var accessKey = '8YKtGoUAGmpHA9WnoeNSqXTgMdnJHxOBznMKA6bs';
var secretKey = 'bb0RN2sGDz0J0-Eyz7a67BN-URcDfusftnDQ-PUM';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

// var options = {
//   scope: bucket,
// };
// var putPolicy = new qiniu.rs.PutPolicy(options);
// var uploadToken=putPolicy.uploadToken(mac);
// var formUploader = new qiniu.form_up.FormUploader(config);
// var putExtra = new qiniu.form_up.PutExtra();

mongoose.connect('mongodb+srv://wangdabao:wang110120Q@cluster0-itq9z.azure.mongodb.net/test', { useUnifiedTopology: true, useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log('连接成功')
});
var bucketManager = new qiniu.rs.BucketManager(mac, config);
const fetchImg = (url, key) => {
	bucketManager.fetch(url, bucket, key, function (err, body){
		if (!err) {
			// downLoad(body)
		} else {
			throw err
		}
	})
}
// var key='test.jpg';
// 文件上传
// const downLoad = (image, key) => {
// // var key='test.jpg';
// 	formUploader.putFile(uploadToken, key, image, putExtra, function(respErr,
// 		respBody, respInfo) {
// 		if (respErr) {
// 			throw respErr;
// 		}
// 		if (respInfo.statusCode == 200) {
// 			console.log(respBody);
// 		} else {
// 			console.log(respInfo.statusCode);
// 			console.log(respBody);
// 		}
// 	})
// }

// const iniit = () => {
const  scheduleCronstyle = ()=>{
	let rule = new schedule.RecurrenceRule();
	rule.date = 1;
	rule.hour = 6;
	rule.minute = 0;
	rule.second = 0;
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob(rule, ()=>{
			// console.log(111)
			getBing()
        // console.log('scheduleCronstyle:' + new Date());
    }); 
}


const getBing = () => {
	let url = `https://cn.bing.com/HPImageArchive.aspx`
	request({
		method: 'GET',
		url,
		qs: {
			format: 'js',
			idx: 0,
			n: 1,
			pid: 'hp',
			uhdwidth: 3840,
			uhdheight: 2160,
			uhd: 1
		}
	}, (err, res) => {
		if (!err) {
			// console.log(res)
			let body = JSON.parse(res.body)
			let bingUrl = 'https://cn.bing.com' + body.images[0].url
			let key = body.images[0].hsh
			// console.log(body.images[0])
			saveInfo(body)
			fetchImg(bingUrl, key)
			// request(bingUrl).pipe(fs.createWriteStream('./image' + '/' + key + '.jpeg'))
		}
	})
}
const saveInfo = (info) => {
	// console.log(info, bingClass)
	bingClass.save(info.images[0])
	// fs.writeFileSync()
	// fs.createWriteStream('./image/' + url)
}
// getBing()
scheduleCronstyle();