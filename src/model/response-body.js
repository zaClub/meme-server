module.exports = function ResBody(status = true, msg = '', data = {}) {

  this.status = status
  this.msg = msg
  this.data = data
}