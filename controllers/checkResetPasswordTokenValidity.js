import { ResetPassword } from "../db/dbConfig.js"

async function checkResetPasswordTokenValidity(req,res)
{
    try
    {
        const resetPassword = await ResetPassword.findOne({_id:req.params.id})
        console.log(resetPassword)
        if(!resetPassword)
        {
            throw new Error()
        }
        let valid = false
        if(resetPassword.expireDate > new Date().getTime())
        {
            valid = true
        }
        res.status(200).json({tokenValid:valid})
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default checkResetPasswordTokenValidity