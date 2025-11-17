import s3Upload from "../s3/s3Upload.js"

async function postBoardImg(req,res)
{
    try
    {
        await s3Upload(`${req.file.destination}${req.file.filename}`,`boardImg/${req.file.filename}`,req.file.mimetype)
        const link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/boardImg/${req.file.filename}`
        res.status(200).json({link})
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default postBoardImg