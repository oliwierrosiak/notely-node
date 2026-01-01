import fs from 'fs'

async function deleteFile(path,file) {
    try
    {
        await fs.promises.unlink(`${path}/${file}`)
    }
    catch(ex)
    {}
}

async function tempCleaner(temp,directory)
{
    fs.readdir(`uploads/${temp}`,(err,files)=>{
        if(err)
        {
            return null
        }
        files.forEach(x=>deleteFile(`uploads/${temp}`,x))
    })
    fs.readdir(`uploads/${directory}`,(err,files)=>{
        if(err)
        {
            return null
        }
        files.forEach(x=>deleteFile(`uploads/${directory}`,x))
    })
}

export default tempCleaner