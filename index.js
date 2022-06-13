const browserObject = require('./browser');
const scraperController = require('./pageController');

//Khởi động trình duyệt và tạo một phiên bản trình duyệt
let browserInstance = browserObject.startBrowser();

// Chuyển phiên bản trình duyệt đến điều khiển
scraperController(browserInstance)