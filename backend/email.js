const mailer = require('nodemailer')

let emailer = async (req,res) => {
    let transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: 'ranveerbhatti2106@gmail.com',
        to: recipientEmail,
        subject: subject,
        text: text,
        attachments: [{
            filename: 'bill.png',
            content: attachment,  // The buffer from the image generation function
            encoding: 'base64'
        }]
    };

    await transporter.emailer(mailOptions);
}
export default emailer;