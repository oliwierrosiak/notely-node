import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./s3Config.js";

function s3Delete(key)
{
    const command = new DeleteObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:key
    })

    return s3.send(command)
}

export default s3Delete