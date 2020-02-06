import * as Papa from "papaparse"
import * as fs from "fs"
import CrawlerService from "../CrawlerService/CrawlerService"

class ListParser {

    constructor() {

    }

    public getCrawlin(filePath: string) {

        const parsedFile = this.readFile(filePath);

        CrawlerService.doTheCrawling(parsedFile)

    }


    private readFile(filePath: string) {

        let data = fs.readFileSync(filePath);

        return this.parseFile(data.toString())

    }


    private parseFile(file: any) {

        let result = Papa.parse(file, {});

        return result.data

    }

}

export default new ListParser()
