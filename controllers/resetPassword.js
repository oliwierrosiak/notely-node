import { ResetPassword, User } from "../db/dbConfig.js"
import sendEmail from "../mail/sendEmail.js"

const message = `
    
`

async function resetPassword(req,res)
{
    res.sendStatus(200)
    return
    try
    {   
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
            res.status(404).json({status:404})
        }
        else
        {
            const resetPasswordObject = new ResetPassword({
                email:req.body.email
            })
            const saved = await resetPasswordObject.save()

        //     await sendEmail({to:req.body.email,message:`<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.05);">
        // <tr>
        //     <td align="center" style="background-color:#02735E;padding:30px;">
        //         <img src="https://interactive-board-storage.s3.eu-north-1.amazonaws.com/notely.png" alt="Notely logo" width="150" style="display:block;margin-bottom:15px;" />
        //         <h1 style="margin:0;font-size:22px;color:#ffffff;">Resetowanie Hasła</h1>
        //     </td>
        // </tr>
        // <tr>
        // <td style="padding:30px;color:#1f2937;font-size:15px;line-height:1.6;">
        // <p>Cześć,</p>
        // <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w <strong>Notely</strong>.
        // </p>
        // <p>Aby ustawić nowe hasło, kliknij w przycisk poniżej: 
        // </p>
        // <p style="text-align:center;margin:30px 0;"> <a href="http://localhost:3000/passwordreset/${saved.id}" style=" background-color:#F27405; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block; "
        // >Resetuj hasło</a>
        // </p>
        // <p> Jeśli to nie Ty wysłałeś prośbę o zmianę hasła, zignoruj tę wiadomość — Twoje konto pozostanie bezpieczne.</p>
        // <p style="margin-top:30px;"> Pozdrawiamy,<br /> <strong>Zespół Notely</strong> </p>
        // </td>
        // </tr>
        // <tr>
        // <td style="background-color:#014040;padding:20px;text-align:center;font-size:12px;color:#6b7280;"> <p style="margin:0;"> Notely · systemowe powiadomienie </p>
        // <p style="margin:5px 0 0;"> Jeśli masz pytania, skontaktuj się z nami: <a href="mailto:notely.help@gmail.com" style="color:#2563eb;text-decoration:none;"> notely.help@gmail.com </a>
        // </p>
        // </td>
        // </tr>
        // </table>`,title:'Resetowanie hasła aplikacji Notely'})
        res.sendStatus(200)

        }
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default resetPassword