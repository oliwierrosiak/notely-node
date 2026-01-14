import { User } from "../db/dbConfig.js"
import bcrypt from 'bcrypt'
import s3Delete from "../s3/s3Delete.js"

const deleteUserPhoto = async(img)=>{
    try{
        const key = img.split(`${process.env.AWS_ADDRESS}/`)[1]
        await s3Delete(key)
    }
    catch(ex)
    {}
}

async function deleteUserAccount(req,res)
{
    try
    {
        const responseError = new Error('invalida password')
        responseError.status = 403

        const user = await User.findOne({email:req.user})
        if(!user)
        {
           throw responseError
        }
        if(!bcrypt.compareSync(req.body.password,user.password))
        {
            throw responseError
        }
        else
        {
            if(user.img)
            {
               deleteUserPhoto(user.img)
            }

            await User.deleteOne({_id:user._id})

            res.sendStatus(200)
        }
    }
    catch(ex)
    {
        if(ex.status === 403)
        {
            res.sendStatus(403)
        }
        else
        {
            res.sendStatus(500)

        }
    }
    res.sendStatus(403)
}

export default deleteUserAccount