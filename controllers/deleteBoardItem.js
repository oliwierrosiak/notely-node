import { Notes } from "../db/dbConfig.js"

async function deleteBoardItem(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.boardId})
        if(!note)
        {
            throw new Error()
        }
        const elements = [...note.content]
        const index = elements.findIndex(x=>x.id === req.params.elementId)
        if(index === -1)
        {
            throw new Error()
        }
        elements.splice(index,1)
        note.content = elements
        await note.save()

        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}   

export default deleteBoardItem