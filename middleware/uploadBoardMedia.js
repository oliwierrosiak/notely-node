import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/boardMediaTemp/')
    },
    filename: (req,file,cb) =>
    {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const boardMediaUpload = multer({storage})

export default boardMediaUpload