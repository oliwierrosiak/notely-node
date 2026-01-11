import { Notes } from "../db/dbConfig.js"

async function getNotes(req,res)
{
    try
    {
        const response = {myNotes:[],visited:404}
        const myNotes = await Notes.find({admin:req.user},'title visibility code')
        response.myNotes = myNotes.length === 0 ? 404 : myNotes.reverse()
        res.status(200).json(response)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getNotes