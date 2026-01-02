import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function verifyToken(req,res,next)
{
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token)
    {
        res.sendStatus(401)
    }

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,data) =>{
        if(err)
        {
            res.sendStatus(401)
        }
    })

    next()

}

export default verifyToken