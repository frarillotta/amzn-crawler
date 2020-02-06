import * as Papa from "papaparse"
import * as fs from "fs"

class FileWriter {

    constructor() {


    }


    parseObject(resultObject: any) {

        console.log(resultObject);

        let csv = Papa.unparse(resultObject);

        fs.writeFileSync('./results.csv', csv)

    }


}

export default new FileWriter()
