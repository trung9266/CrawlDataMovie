const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser);
    } catch (err) { console.log("Không thể giải quyết phiên bản trình duyệt => ", err); }
}
module.exports = (browserInstance) => scrapeAll(browserInstance)