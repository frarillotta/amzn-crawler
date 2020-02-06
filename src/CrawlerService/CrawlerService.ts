import puppeteer from "puppeteer-extra"
import FileWriter from "../FileClient/FileWriter"

class CrawlerService {


    constructor() {

    }

    public async startCrawler () {

            const browser = await puppeteer.launch({headless:true});
            const page = await browser.newPage();

            return {
                browser,
                page
            }

    }


    prepareToCrawl() {



    }


    async doTheCrawling(parsedFile: any) {

        const pup = await this.startCrawler();

        const resultsObject = [];

        for (const element of parsedFile) {

            try {

                await pup.page.goto(element[0], {waitUntil: "domcontentloaded"});


                let amzn = await pup.page.evaluate(() => {

                    // @ts-ignore
                    if (window.apstag && typeof window.apstag.fetchBids === "function") {

                        return "yes"

                    }

                    return "no"

                });

                let tempObject = {
                    "element": element[0],
                    "amzn": amzn
                };
                // @ts-ignore
                resultsObject.push(tempObject);

            } catch (e) {

                continue

            }

        }

        await pup.browser.close();

        FileWriter.parseObject(resultsObject);

    }


}

export default new CrawlerService()
