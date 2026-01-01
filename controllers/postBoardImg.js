import s3Upload from "../s3/s3Upload.js"
import imgCompressor from "../sharp/imgCompressor.js"
import tempCleaner from "../tempCleaners/boardMediaTempCleaner.js"
import videoCompressor from "../videoCompressor/videoCompressor.js"

async function postBoardImg(req,res)
{
    try
    {
        let file
        if(req.file.mimetype.includes('image/'))
        {
            file = await imgCompressor(req.file,'boardMedia')
        }
        else if(req.file.mimetype.includes('video/'))
        {
            file = await videoCompressor(`${req.file.destination}${req.file.filename}`,`uploads/boardMedia/${req.file.filename}`,req.file)
        }
        else
        {
            throw new Error()
        }
        await s3Upload(file.path,`boardMedia/${file.filename}${file.extension}`,file.mimetype)
        const link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/boardMedia/${file.filename}${file.extension}`
        res.status(200).json({link,mimetype:file.mimetype})
        tempCleaner('boardMediaTemp','boardMedia')
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default postBoardImg