import jwt from 'jsonwebtoken'

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
        else
        {
            req.user = data.email
        }
    })

    next()

}

export default verifyToken