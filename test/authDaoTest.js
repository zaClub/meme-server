const authDao = require('../src/dao/auth')

let example = [
  {
    openId: 'sdfsdfafdsafsd',
    spaceUsed: 0,
    remark: 'dasfdsa'
  },
  {
    openId: 'sdfsdsfsdf',
    remark: 'dasfdsa'
  },
  {
    openId: "dsfsdfsdfsdf"
  },
  {
    openId: 'sfsdfs',
    remark: 123
  }
]

example.forEach(el => console.log(authDao.insertUser(el)))