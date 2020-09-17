const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const random = require('./random')

// Init Express App
const app = express()

// Set Express to Accept Data from Forms
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Home Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Allow File Uploading
app.use(fileUpload())

// Upload Route
app.post('/upload', (req, res) => {

  // If There is No File Uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
      status: 0,
      msg: 'No File Sent! Please Upload a File'
    });
    return
  }

  // Get The Sent File
  let file = req.files.image

  // If The Uploaded File is Not an Image
  if (file.mimetype.substring(0, 5) != 'image') {
    res.status(400).json({
      status: 0,
      msg: 'The Sent File Wasn\'t Image! Please Upload an Image'
    });
    return
  }

  // Rename The Image to be Like 'image_1634764371_7487646749.ext'
  let rename_to = 'image_' + Date.now() + '_' + random(10) + path.parse(file.name).ext

  // Move The Uploaded Image to '/public/images' Folder
  file.mv(path.join(__dirname, 'public', 'images', rename_to), (err) => {
    // If There is Error
    if (err) {
      res.status(400).json({
        status: 0,
        msg: 'Ooops! There is an Error While Uploading The File',
        err: err
      });
      return
    }
    // If The File Was Uploaded Successfully
    res.json({
      status: 1,
      msg: 'File Uploaded Successfully, to see the image please <a href="/images/' + rename_to + '">click here</a>',
    });
    return
  })
})

app.listen(3000, () => console.log('Listening on port 3000'))