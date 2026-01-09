import { RefreshToken } from "../db/dbConfig.js"

async function logout(req,res)
{
    try
    {
        const token = req.headers['authorization']?.split(' ')[1]
        if(!token)
        {
            throw new Error()
        }
        await RefreshToken.deleteOne({token})
    }
    catch(ex)
    {
    }
    res.sendStatus(200)
}

export default logout