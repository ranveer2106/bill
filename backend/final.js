const {generator} = require("./generator");
const emailer = require('./email');

let final = async (req, res) => {
    try {
        const {htmlContent} = req.body;

        const screenshot = await generator(htmlContent);
        await emailer(email, 'Your Bill', 'Please find attached your bill.', billImage);
        const base64Screenshot = screenshot.toString('base64');
        res.send({ image: base64Screenshot , message: 'Screenshot generated successfully' });

        // res.send(screenshot);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while generating the screenshot' });

    }
}