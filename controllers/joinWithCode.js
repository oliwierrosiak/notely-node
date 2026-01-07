import { Notes } from "../db/dbConfig.js"

async function joinWithCode(req,res)
{
    try
    {
        const note = await Notes.findOne({code:req.params.code},"_id")
        if(!note)
        {
            const error = new Error('Note not found')
            error.status = 404
            error.mess = "Note not found"
            throw error
        }
        else
        {
            res.status(200).json({id:note._id})
        }
    }
    catch(ex)
    {
        if(ex.status == 404)
        {
            res.status(404).json(ex)
        }
        else
        {
            res.sendStatus(500)

        }
    }
}

export default joinWithCode