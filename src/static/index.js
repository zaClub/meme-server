var pic = document.querySelector('#pic')

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
  })
})