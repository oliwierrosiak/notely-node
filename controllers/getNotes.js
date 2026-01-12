import { Notes } from "../db/dbConfig.js"

async function getNotes(req,res)
{
    try
    {
        const response = {myNotes:[],visited:[]}
        const myNotes = await Notes.find({admin:req.user},'title visibility code notePassword')
        const visitedNotes = await Notes.find({'visitors.user':req.user},'title code').sort({'visitors.time':-1})
        if(myNotes.length === 0)
        {
            response.myNotes = 404
        }
        else
        {
            myNotes.map(x=>x.notePassword &&= true)
            response.myNotes = myNotes.reverse()
        }

        if(visitedNotes.length === 0)
        {
            response.visited = 404
        }
        else
        {
            response.visited = visitedNotes
        }
        res.status(200).json(response)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getNotes