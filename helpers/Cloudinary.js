const { cloudinary: data } = require('../env')
const path = require('path');
var fs = require('fs')
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
cloudinary.config({
    cloud_name: 'dr9bbyvab',
    api_key: data.apiKey,
    api_secret: data.secretKey
})
const folderName = 'staffMgtPics'

const uploader = (req, res, next) => {
    const form = new formidable.IncomingForm();
    let filePath = '';
    let staffId = null
    form.uploadDir = path.join(__dirname, '../uploads');
    form.on('file', (field, file) => {
        fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
            if(err) throw err;
        })
        filePath = form.uploadDir + '/' +file.name;
    });
    form.on('field', (name, value) => {
        req[name] = value;
        staffId = req && req.staffId ? req.staffId : null;
    })
    form.on('error', (err) => {
        res.status(402).json({status: 'error', msg: 'formidable error'})
    });
    form.on('end', () => {
        console.log('image uploading..');
        const fileName = staffId || new Date().toISOString();    
        cloudinary.uploader.upload(filePath,
            {
                public_id: `${folderName}/${fileName}`,
                overwrite: true
            }, // directory and tags are optional
            function(err, image) {
              if (err) return res.status(500).send({
                  error: err,
                  filePath
              })

              fs.unlinkSync(filePath)
              req.imageUrl = image.url;
              req.staffId = staffId
              console.log('image upload success');
            //   res.status(200).json({status:'success', data: image})
              next()
            }
          )
    });
    form.parse(req);
}


module.exports = {
  uploader,
};