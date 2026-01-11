import { Notes } from "../db/dbConfig.js"

async function deleteNote(req,res)
{
    try
    {
        await Notes.deleteOne({_id:req.params.id})
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default deleteNote