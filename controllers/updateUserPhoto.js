import { User } from "../db/dbConfig.js"
import imgCompressor from "../sharp/imgCompressor.js"
import s3Upload from "../s3/s3Upload.js"
import tempCleaner from "../tempCleaners/boardMediaTempCleaner.js"
import s3Delete from "../s3/s3Delete.js"

async function updateUserPhoto(req,res)
{
    try
    {
        const user = await User.findOne({email:req.user})

        const img = await imgCompressor(req.file,'userImg')

        await s3Upload(img.path,`userImg/${img.filename}${img.extension}`,img.mimetype)

        if(user.img && user.img.includes('.amazonaws.com'))
        {
            await s3Delete(user.img.split(`${process.env.AWS_ADDRESS}/`)[1])
        }

        const link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/userImg/${img.filename}${img.extension}`

        user.img = link

        await user.save()
        res.sendStatus(200)

        tempCleaner('userImgTemp','userImg')
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateUserPhoto