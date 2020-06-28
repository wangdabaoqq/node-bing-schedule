# 必应 :smile_cat:
> 通过定时任务每天早上6点定时获取必应图片, 并且上传到七牛云。获取必应接口的其他字段上传到云mongo.

## 必应接口地址
`https://cn.bing.com/HPImageArchive.aspx` `其他参数查看index.js`

## 云数据库mongodb
`https://cloud.mongodb.com/`

## 使用条件
- Node 10.10.0 (本地环境)
- npm 6.4.1 (本地环境)

## npm包
```js
  "mongoose": "^5.9.20",
  "node-schedule": "^1.3.2",
  "nodemon": "^2.0.4",
  "qiniu": "^7.3.1",
  "request": "^2.88.2"
```
**:warning:** 部署服务器时要全局安装`npm i forever -g`

## 运行
```js
  npm i || yarn
  node index.js || npm start(开发环境下使用)
```
## 服务器启动
```js
  forever start node.js
```
## 待完成
- [ ] 基于mongodb数据编写接口
- [ ] 基于数据做出前端页面展示

## 参考
参考作者
[xCss](https://github.com/xCss/bing)
