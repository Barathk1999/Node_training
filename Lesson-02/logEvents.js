const {format} = require('date-fns');
const {v4: uuid} = require('uuid'); //Renaming v4 to uuid
//const uuid = require('uuid'); when use "uuid.v4()"

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const logEvents = async (message, logName) => {
    const datetime =`${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${datetime}\t ${uuid()}\t ${message}\n`
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        //testing
        await fsPromises.appendFile(path.join(__dirname,'logs',logName), logItem);
    } catch (err){
        console.log(err);
    }
}

module.exports = logEvents;