import fs from 'fs'

async function deleteFile(file) {
    try
    {
        await fs.promises.unlink(`uploads/boardMediaTemp/${file}`)
    }
    catch(ex)
    {}
}

async function boardMediaTempCleaner()
{
    fs.readdir(`uploads/boardMediaTemp`,(err,files)=>{
        if(err)
        {
            return null
        }
        files.forEach(x=>deleteFile(x))
    })
}

export default boardMediaTempCleaner