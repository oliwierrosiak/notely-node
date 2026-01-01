import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/userImgTemp/')
    },
    filename: (req,file,cb) =>
    {
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const userImgUploader = multer({storage})

export default userImgUploader