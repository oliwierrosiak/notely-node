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
        
        const canvas = note.content.find(x=>x.type === "canvas")
        if(canvas)
        {
            const noteContent = [...note.content]
            const idx = noteContent.findIndex(x=>x.type === 'canvas')
            noteContent.splice(idx,1)
            noteContent.unshift(canvas)
            note.content = [...noteContent]
        }


        const visitors = [...note.visitors]

        const userAlreadyVisitedIndex = visitors.findIndex(x=>x.user === req.user)
        
        if(userAlreadyVisitedIndex !== -1)
        {
            visitors.splice(userAlreadyVisitedIndex,1)
        }
        

        if(note.visibility !== "private" || req.user === note.admin)
        {
            visitors.push({user:req.user,time:new Date().getTime()})
            note.visitors = visitors

        }

        await note.save()
        note.notePassword &&= true
        res.status(200).json(note)
        
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getBoardData