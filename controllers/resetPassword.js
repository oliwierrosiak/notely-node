import { ResetPassword, User } from "../db/dbConfig.js"

async function resetPassword(req,res)
{
    try
    {   
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
            res.status(404).json({status:404})
        }
        else
        {
            const resetPasswordObject = new ResetPassword({
                email:req.body.email
            })
            await resetPasswordObject.save()
        }
        res.sendStatus(200)
        
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default resetPassword