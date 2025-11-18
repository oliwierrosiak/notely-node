import s3Upload from "../s3/s3Upload.js"
import imgCompressor from "../sharp/imgCompressor.js"
import boardImgTempCleaner from "../tempCleaners/boardImgTempCleaner.js"

async function postBoardImg(req,res)
{
    try
    {
        let file
        if(req.file.mimetype.includes('image/'))
        {
            file = await imgCompressor(req.file)
        }
        else if(req.file.mimetype.includes('video/'))
        {
            file = {path:req.file.path,extension:`.${req.file.filename.split('.')[1]}`,filename:req.file.filename.split('.')[0],mimetype:req.file.mimetype}
        }
        else
        {
            throw new Error()
        }

        await s3Upload(file.path,`boardImg/${file.filename}${file.extension}`,file.mimetype)
        const link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/boardImg/${file.filename}${file.extension}`
        res.status(200).json({link,mimetype:file.mimetype})
        boardImgTempCleaner()
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default postBoardImg