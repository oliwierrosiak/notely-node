import jwt from 'jsonwebtoken'

function createTokens(user)
{
    const token = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'10s'})
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN,{expiresIn:'6h'})

    return {accessToken:token,refreshToken}
}

export default createTokens