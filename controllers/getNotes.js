import { Notes } from "../db/dbConfig.js"

async function getNotes(req,res)
{
    try
    {
        const response = {myNotes:[],visited:404}
        const myNotes = await Notes.find({admin:req.user},'title visibility code notePassword')
        if(myNotes.length === 0)
        {
            response.myNotes = 404
        }
        else
        {
            myNotes.map(x=>x.notePassword &&= true)
            response.myNotes = myNotes.reverse()
        }
        res.status(200).json(response)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getNotes