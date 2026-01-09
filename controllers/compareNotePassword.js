import { Notes } from '../db/dbConfig.js'
import bcrypt from 'bcrypt'

async function compareNotePassword(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.body.noteId})
        if(!note)
        {
            throw new Error()
        }
        if(bcrypt.compareSync(req.body.password,note.notePassword))
        {
            res.status(200).json({id:note._id})
        }
        else
        {
            res.sendStatus(403)
        }
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default compareNotePassword