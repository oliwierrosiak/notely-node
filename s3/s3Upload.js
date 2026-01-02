import fs from 'fs'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3 from './s3Config.js'

function s3Upload(file,name,mimetype)
{
    const buffer = fs.readFileSync(file)
    const command = new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:name,
        Body:buffer,
        ContentType:mimetype
    })

    return s3.send(command)

}

export default s3Upload