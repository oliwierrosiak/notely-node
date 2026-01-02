import { User } from '../db/dbConfig.js'

async function getUserData(req,res)
{
    try
    {
        const user = await User.findOne({email:req.user})
        if(!user)
        {
            throw new Error()
        }
        res.status(200).json({email:user.email,name:user.email,img:user.img})
    }
    catch(ex)
    {
        res.sendStatus(401)
    }

}

export default getUserData