const pool = require('../util/db-connection')
const check = require('../util/check')
const CODE = require('../constants/code')

module.exports = {
  // allFields: ['wxid', 'space_used', 'remark'],

  /**
   * 查询用户信息
   * @param {String} openId 
   * @param {Array} fields 字符串数组，表示需要查询的列
   */
  selectUser({openId, fields}) {
    let fieldsStr = fields.join(', ')
    let queryStr = `
      SELECT ${fieldsStr}
      FROM user
      where wxid = '${openId}'`

      return new Promise((resolve, reject) => {
        pool.query(queryStr, function (error, results) {
          if (error) {
            reject(error)
            // 这里不返回的话会继续执行下面的代码
            return
          }
  
          if (results.length) {
            // 存在该用户
            resolve({
              code: CODE.USER_EXIST,
              data: results[0]
            })
          } else {
            // 不存在该用户
            reject(CODE.USER_NOT_EXIST)
          }
        })
  
      })
  },

  
  insertUser({openId, spaceUsed, remark}) {
    let vals = [openId, spaceUsed, remark]
      .filter(check)
      .map(el => `'${el}'`)
      .join(',')

    let queryStr = `
      INSERT INTO user
      (${check(openId) ? 'wxid' : ''}${check(spaceUsed) ? ', space_used' : ''}${check(remark) ? ', remark' : ''})
      VALUES
      (${vals})
    `

    return new Promise((resolve, reject) => {
      pool.query(queryStr, function (error, results) {
        if (error) {
          reject(error)
          // 这里不返回的话会继续执行下面的代码
          return
        }

        if (results.affectedRows === 1) {
          resolve({
            code: CODE.SUCCESS
          })
        } else {
          reject(CODE.INSERT_FAIL)
        }
      })

    })
  },

  // 弃用
  isExistOrInsert(openId) {
    let queryStr = `insert ignore into user (wxid) values ('${openId}')`

    return new Promise((resolve, reject) => {
      pool.query(queryStr, function (error, results) {
        if (error) {
          reject(error)
          // 这里不返回的话会继续执行下面的代码
          return
        }

        // 已存在
        if(results.affectedRows === 0) resolve({code: CODE.USER_EXIST})

        // 不存在，已插入
        if(results.affectedRows === 1) resolve({code: CODE.USER_NOT_EXIST})
      })

    })
  }
}