const puppeteer = require('puppeteer');

let generator = async (htmlContent) =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const screenshot = await page.screenshot();
    await browser.close();
    return screenshot;
}

export default generator;