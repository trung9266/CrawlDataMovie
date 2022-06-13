const fs = require('fs');
var data = fs.readFileSync('./links.json', { encoding: 'utf8' });
// lấy link trong file links.json
let web = JSON.parse(data);
const scraperObject = {
    async scraper(browser, category) {
        //Mảng chứa toàn bộ dữ liệu bài viết
        // const arr = [];
        //Lặp các link trong file json để sau khi crawl data từ trang này sẽ sang trang khác
        for (var i of web) {
            let url = i.url;
            let page = await browser.newPage();
            console.log(`Điều hướng đến `, url, `...`);
            await page.goto(url, {
                waitUntil: 'load',
                timeout: 0
            });
            //Mảng chứa url truy xuất từ 1 trang
            const urls = await page.$$eval("a.cover", results =>
                Array.from(results)
                .map(r => r.href)
            );
            console.log(urls);
            //Lấy dữ liệu từ các class trong từng bài báo
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};
                var genres = [];
                let productionCompanies = [];
                let productionCountries = [];
                let name = {};
                let name1 = {};
                let name2 = {};
                let name3 = {};
                let name4 = {};
                let name5 = {};
                let name6 = {};
                let newPage = await browser.newPage();
                await newPage.goto(link, {
                    waitUntil: 'load',
                    timeout: 0
                });

                dataObj['slug'] = await newPage.$eval('.tt-details > .main > h1', text => {
                    text = text.textContent.replace(/\s/g, '-');
                    return text;
                });
                dataObj['title'] = await newPage.$eval('.tt-details > .main > h1', text => {
                    text = text.textContent;
                    return text;
                });
                dataObj['posterUrl'] = await newPage.$eval('.has-text-centered > img', text => {
                    text = text.getAttribute('src');
                    return text;
                });
                dataObj['backdropUrl'] = await newPage.$eval('.backdrop', text => {
                    text = window.getComputedStyle(text).backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
                    return text;
                });


                name['name'] = await newPage.$eval('.level-right .level-item > .button:first-of-type', text => {
                    text = text.textContent;
                    return text;
                });
                genres.push(name);
                dataObj['genres']=genres;

                name1['name'] = await newPage.$eval('.level-right .level-item > .button:last-of-type', text => {
                    text = text.textContent;
                    return text;
                });
                genres.push(name1);
                dataObj['genres']=genres;
                console.log("data",dataObj['genres']);


                dataObj['releaseDate'] = await newPage.$eval('.horizontal-dl > dd:last-of-type', text => {
                    text = text.textContent;
                    return text;
                });
                dataObj['overview'] = await newPage.$eval('.tt-details > .main > .intro', text => {
                    text = text.textContent;
                    return text;
                });
                name2['name'] = await newPage.$eval('.horizontal-dl > dd:first-of-type', text => {
                    text = text.textContent.split(" ", 2)[0];
                    return text;
                });
                productionCompanies.push(name2);
                dataObj['productionCompanies'] = productionCompanies;
                name3['name'] = await newPage.$eval('.horizontal-dl > dd:first-of-type', text => {
                    text = text.textContent.split(" ", 2)[1];
                    return text;
                });
                productionCompanies.push(name3);
                dataObj['productionCompanies'] = productionCompanies;

                name4['name'] = await newPage.$eval('.horizontal-dl > dd:nth-of-type(3)', text => {
                    text = text.textContent;
                    return text;
                });
                productionCountries.push(name4);
                dataObj['productionCountries']=productionCountries

                dataObj['url'] = "";

                
                resolve(dataObj);
                await newPage.close();
            });
            //Lặp các link nhỏ để truy xuất vào từng bài viết
            for (link in urls) {
                let currentPageData = await pagePromise(urls[link]);
                console.log("current", currentPageData);
                //Ghi từng phần tử vào file JSON
                fs.readFile('data.json', 'utf8', function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        const file = JSON.parse(data);
                        file.push(currentPageData);

                        const json = JSON.stringify(file);
                        //ghi file
                        fs.writeFile('data.json', json, 'utf8', function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Đã ghi bài báo vào data.");
                            }
                        });
                    }
                });
            }
            await newPage.close();

        }
    }
}
module.exports = scraperObject;