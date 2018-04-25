const axios = require('axios')
const authDao = require('../dao/auth')
const { confirmUrl, AppId, AppSecret } = require('../../app.config').WEAPP_CONFIG

module.exports = {
  confirmCode(code) {
    return axios.get(`${confirmUrl}?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`)
  },

  selectUser: authDao.selectUser,
  insertUser: authDao.insertUser,
  isExistOrInsert: authDao.isExistOrInsert
}