const multer = require('multer');

//Destino das imagens a serem salvas
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/images')
    },

    filename:(req,file,cb) => {
        cb(null,`${Date.now().toString()}-${file.originalname}`)
    }
})

const fileFilter = (req,file, cb) =>{
    const isAccepted = ['image/png','image/jpg', 'image/jpeg']
    .find(accepteFormat => accepteFormat == file.mimetype)

    if(isAccepted){
        return cb(null,true);
    }

    return cb(null,false);  
}

module.exports = multer({
    storage,
    fileFilter
})