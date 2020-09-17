/**
 * This function runs when the form is submitted
 * 
 * @param {NodeList} form 
 */
function upload(form) {

  // Get Sent Data
  let data = new FormData()
  data.append('title', form['title'].value)
  data.append('image', form['image'].files[0])

  // Send an AJAX Request
  let request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      let response = JSON.parse(this.responseText)
      // If The File Was Uploaded
      if (response.status) {
        // Show a Success Message to The User
        render_message('success', response.msg)
      } else {
        // Show an Error Message to The User
        render_message('error', response.msg)
      }
    }
  }
  request.open('POST', '/upload', true)
  request.send(data)
}


/**
 * This Function is Used To Render Response Message
 * After Submitting The Form
 * 
 * @param {string} css_class 
 * @param {string} content 
 */
function render_message(css_class, content) {
  let html = '<div class="message ' + css_class + '">'
  html += content
  html += '</div>'

  document.querySelector('.area').innerHTML = html
}