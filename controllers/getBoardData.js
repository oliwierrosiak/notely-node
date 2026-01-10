import { Notes } from "../db/dbConfig.js"

async function getBoardData(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        if(!note)
        {
            throw new Error()
        }
        note.notePassword &&= true
        const canvas = note.content.find(x=>x.type === "canvas")
        if(canvas)
        {
            const noteContent = [...note.content]
            const idx = noteContent.findIndex(x=>x.type === 'canvas')
            noteContent.splice(idx,1)
            noteContent.unshift(canvas)
            note.content = [...noteContent]
        }
        res.status(200).json(note)
        
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getBoardData