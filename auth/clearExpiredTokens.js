import { RefreshToken } from "../db/dbConfig.js"

async function clearExpiredTokens()
{
    try
    {
        const tokens = await RefreshToken.deleteMany({expiresIn:{$lt:new Date().getTime()}})
    }
    catch(ex)
    {
    }
}

export default clearExpiredTokens