var pic = document.querySelector('#pic')
var preView = document.querySelector('#preView')
var url = document.querySelector('#url')

document.querySelector('#upload').addEventListener('click', function(ev) {
  var formdata = new FormData()

  formdata.append('files', pic.files[0],  pic.files[0].name)
  formdata.append('msg', 'fuckyou')

  // formdata = {haha: 'heihei'}

  axios({
    url: '/pic/upload',
    method: 'POST',
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    preView.src = res.data.data.url
    url.innerHTML = res.data.data.url
  })
})