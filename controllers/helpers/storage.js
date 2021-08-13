const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    if(req.body.type=='student'){
      return cb(null, path.resolve(__dirname, '..', '..', 'public/UserImages/Students'));
    }else if( req.body.type=='alumni'){
      return cb(null, path.resolve(__dirname, '..', '..', 'public/UserImages/Alumnis'));
    }else if(req.body.type=='admin'){
      return cb(null, path.resolve(__dirname, '..', '..', 'public/UserImages/Admins'));
    }
    cb(null, path.resolve(__dirname, '..', '..', 'public/Images/Companies'))
  },
  filename: function(req, file, cb){
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    if(req.body.type){
      console.log(req.body);

      // return cb(null, file.fieldname + '_' + req.body.email + ext)
      return cb(null,req.body.email + ".jpg");
    }
    // cb(null, file.fieldname + '_' + req.body.company + '_' + Date.now() + ext)
    cb(null,req.body.company + ".jpg");
  }
})

var upload = multer({storage: storage})

module.exports = upload