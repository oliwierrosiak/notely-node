import s3Upload from "../s3/s3Upload.js"
import imgCompressor from "../sharp/imgCompressor.js"
import boardMediaTempCleaner from "../tempCleaners/boardMediaTempCleaner.js"
import videoCompressor from "../videoCompressor/videoCompressor.js"

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
            // videoCompressor(`${req.file.destination}${req.file.filename}`,`uploads/boardMedia/${req.file.filename}`)
            file = {path:req.file.path,extension:`.${req.file.filename.split('.')[1]}`,filename:req.file.filename.split('.')[0],mimetype:req.file.mimetype}
        }
        else
        {
            throw new Error()
        }
        console.log(file.path)
        await s3Upload(file.path,`boardMedia/${file.filename}${file.extension}`,file.mimetype)
        const link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/boardMedia/${file.filename}${file.extension}`
        res.status(200).json({link,mimetype:file.mimetype})
        boardMediaTempCleaner()
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default postBoardImg