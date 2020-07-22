const puppeteer = require('puppeteer');
const scrapeInsta = async(query) => {

    const browser = await puppeteer.launch( {headless: true});
    const page = await browser.newPage();

    await page.goto(`https://www.instagram.com/${query}/`);

    await page.waitForSelector('img ', {
        visible: true,
    });

    const data = await page.evaluate( () => {

        const images = document.querySelectorAll('img');
        const urls = Array.from(images).map(v => v.src);
        return urls;
    });

    await browser.close();
    
    // console.log(data);

    return JSON.stringify(data);


}

module.exports = {
    scrapeInsta
}