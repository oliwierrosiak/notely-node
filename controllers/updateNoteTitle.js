import { Notes } from "../db/dbConfig.js"

async function updateBoard(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        if(!note)
        {
            throw new Error()
        }
        note.title = req.body.title || "Nowy projekt"
        await note.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default updateBoard