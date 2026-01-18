import axios from "axios"
import { User, RefreshToken } from "../db/dbConfig.js"
import createTokens from "../auth/createTokens.js"


const generatePassword = () =>{
    const characters = {
        upper:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','U','W','X','Y','Z'],
        lower:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','x','y','z'],
        numbers:[1,2,3,4,5,6,7,8,9,0],
        special:['#','?','!','@','$','%','^','&','*','-']
    }

    const all = [...characters.upper,...characters.lower,...characters.numbers,...characters.special]

    const password = []

    for(const key in characters)
    {
        for(let i = 0;i<5;i++)
        {
            const idx = Math.floor(Math.random()*characters[key].length)
            password.push(characters[key][idx])
        }
    }

    for(let i = 0;i<20;i++)
    {
        const idx = Math.floor(Math.random()*all.length)
        password.push(all[idx])
    }
    return password.join('')
}

function register(user)
{
    const newUser = new User({
        name:user.name,
        email:user.email,
        img:user.picture,
        password:generatePassword()
    })
    return newUser.save()
}

async function googleLogin(req,res)
{
    try
    {
        const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`,{headers:{"Authorization":`Bearer ${req.body.token}`}})
        if(!googleUser)
        {
            throw new Error()
        }
        const user = await User.findOne({email:googleUser.data.email})
        if(!user)
        {
           await register(googleUser.data)
        }

        const localUser = await User.findOne({email:googleUser.data.email})

        const {accessToken,refreshToken} = createTokens({email:localUser.email})
                
        const refreshObject = new RefreshToken({
            token:refreshToken,
            expiresIn:new Date().getTime() + 21600000
        })
        
        await refreshObject.save()
        
        res.status(200).json({accessToken,refreshToken,user:{email:localUser.email,name:localUser.name,img:localUser.img,id:localUser.id}})
        
        clearExpiredTokens()
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default googleLogin