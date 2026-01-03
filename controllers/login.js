import clearExpiredTokens from "../auth/clearExpiredTokens.js"
import createTokens from "../auth/createTokens.js"
import { RefreshToken, User } from "../db/dbConfig.js"
import bcrypt from 'bcrypt'

async function login(req,res)
{
    try
    {
        const user = await User.findOne({email:req.body.email})
        if(!user || !bcrypt.compareSync(req.body.password,user.password))
        {
            const error = new Error('login error')
            error.status = 401
            error.mess = 'wrong data'
            throw error
        }


        const {accessToken,refreshToken} = createTokens({email:user.email})
        
        const refreshObject = new RefreshToken({
            token:refreshToken,
            expiresIn:new Date().getTime() + 21600000
        })

        await refreshObject.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,    
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 1000 * 6
        })


        res.status(200).json({accessToken,user:{email:user.email,name:user.name,img:user.img,id:user.id}})

        clearExpiredTokens()

    }
    catch(ex)
    {
        if(ex.status === 401)
        {
            res.status(401).json(ex)
        }
        else
        {
            res.sendStatus(500)
        }
    }
}

export default login