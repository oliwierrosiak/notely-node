import {TransactionalEmailsApi, TransactionalEmailsApiApiKeys,} from '@getbrevo/brevo'

async function sendEmail({to,message,title}) 
{
    const apiInstance = new TransactionalEmailsApi();

    apiInstance.setApiKey(
        TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    );

    await apiInstance.sendTransacEmail({
    sender: {
      email: "notely.help@gmail.com",
      name: "Notely",
    },
    to: [{ email: "oliwierrosiak07@gmail.com" }],
    subject: title,
    htmlContent: message,
  });
}

export default sendEmail