import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function createTokens(user)
{
    const token = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'30s'})
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN,{expiresIn:'6h'})

    return {accessToken:token,refreshToken}
}

export default createTokens