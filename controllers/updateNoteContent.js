import { Notes } from "../db/dbConfig.js"

async function updateNoteContent(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        const index = note.content.findIndex(x=>x.id == req.body.id)
        if(index === -1)
        {
            note.content.push(req.body)
            await note.save()
        }
        else
        {
            note.content[index] = req.body
            await note.save()
        }
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateNoteContent