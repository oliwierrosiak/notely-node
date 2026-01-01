import sharp from "sharp";
import fs from 'fs'

async function imgCompressor(file,destinationDirectory)
{
    const buffer = fs.readFileSync(`${file.destination}${file.filename}`)
    let success
    await sharp(buffer).webp({quality:50}).toFile(`uploads/${destinationDirectory}/${file.filename.split('.')[0]}.webp`).then(()=>{success = true}).catch(ex=>{ success = false})
    return success?{path:`uploads/${destinationDirectory}/${file.filename.split('.')[0]}.webp`,extension:'.webp',filename:file.filename.split('.')[0],mimetype:'image/webp'}:{path:`${file.destination}${file.filename}`,extension:`.${file.filename.split('.')[1]}`,filename:file.filename.split('.')[0],mimetype:`image/${file.filename.split('.')[1]}`}

}

export default imgCompressor