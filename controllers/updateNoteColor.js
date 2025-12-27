import { Notes } from "../db/dbConfig.js"

async function updateNoteColor(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        if(note && note.boardColor != req.body.color)
        {
            note.boardColor = req.body.color
            await note.save()
        }
        res.sendStatus(200)
        
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateNoteColor