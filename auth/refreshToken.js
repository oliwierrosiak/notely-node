import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function refreshToken(req,res)
{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken)
    {
        res.sendStatus(403)
    }

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,data)=>{
        if(err)
        {
            res.sendStatus(403)
        }

        const payload = {
            email:data.email
        }

        const newToken = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'30s'})
        res.status(200).json({token:newToken})
    })

}

export default refreshToken