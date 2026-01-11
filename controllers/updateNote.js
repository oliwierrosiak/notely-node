import { Notes } from "../db/dbConfig.js"

async function updateNote(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        note.title = req.body.title
        if(req.body.passwordChanged)
        {
            if(req.body.password)
            {
                note.notePassword = req.body.password
                
            }
            else
            {
                note.notePassword = null

            }
        }
        await note.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateNote