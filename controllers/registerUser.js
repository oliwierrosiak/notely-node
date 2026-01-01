import { User } from "../db/dbConfig.js"
import imgCompressor from "../sharp/imgCompressor.js"
import s3Upload from "../s3/s3Upload.js"
import tempCleaner from "../tempCleaners/boardMediaTempCleaner.js"

async function uploadImg(img)
{
    try
    {
        await s3Upload(img.path,`userImg/${img.filename}${img.extension}`,img.mimetype)
    }
    catch(ex)
    {}
}

async function registerUser(req,res)
{
    try
    {
        let link,img

        if(req.file)
        {
            img = await imgCompressor(req.file,'userImg')
            link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/userImg/${img.filename}${img.extension}`
        }

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            img:link?link:''
        })

        await user.save()

        res.sendStatus(200)
        if(req.file)
        {
            await uploadImg(img)
            tempCleaner('userImgTemp','userImg')
        }
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default registerUser