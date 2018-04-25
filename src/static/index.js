var pic = document.querySelector('#pic')
var preView = document.querySelector('#preView')
var url = document.querySelector('#url')

document.querySelector('#upload').addEventListener('click', function(ev) {
  var formdata = new FormData()
  
  Array.prototype.forEach.call(pic.files, ((el, index) => {
    formdata.append('files' + index, el)
  }))
  formdata.append('msg', 'fuckyou')

  // formdata = {haha: 'heihei'}

  axios({
    url: '/api/meme/upload',
    method: 'POST',
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {

    url.innerHTML = res.data.data.map(el => "<li>" + el.url.Location + "</li>").join('')
    preView.innerHTML = res.data.data.map(el => "<img src=" + el.url.Location + ">").join('')
  })
})
