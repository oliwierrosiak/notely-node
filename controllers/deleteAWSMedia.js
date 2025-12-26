import dotenv from 'dotenv'
import s3Delete from '../s3/s3Delete.js'
dotenv.config()

async function deleteAWSMedia(req,res)
{
    try
    {
        const key = req.body.link.split(`${process.env.AWS_ADDRESS}/`)[1]
        await s3Delete(key)
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default deleteAWSMedia