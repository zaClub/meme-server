/**
 * 响应体构造函数
 * @param {Number} code 错误码
 * @param {String} msg 信息
 * @param {Object} data 数据对象
 */
function ResBody({code, msg = 'asdfsdf', data = {}}) {

  this.code = code
  this.msg = msg
  this.data = data
}

module.exports = ResBody