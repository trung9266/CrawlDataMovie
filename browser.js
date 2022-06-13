const puppeteer = require('puppeteer');
async function startBrowser() {
    let browser;
    try {
        console.log("Đang mở browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true,
        });
    } catch (err) {
        console.log("Không thể tạo phiên bản trình duyệt => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};