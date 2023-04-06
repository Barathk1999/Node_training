const fsPromises = require('fs').promises;
const path =require('path');

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname,'files','starter.txt'), data);
        await fsPromises.writeFile(path.join(__dirname,'files','promise.txt'), data);
        await fsPromises.appendFile(path.join(__dirname,'files','promise.txt'), '\n\nNice to meet you');
        await fsPromises.rename(path.join(__dirname,'files','promise.txt'), path.join(__dirname,'files','promisecomplete.txt'));
        const newdata = await fsPromises.readFile(path.join(__dirname,'files','promisecomplete.txt'),'utf8');
        console.log(newdata);
    }
    catch (err){
        console.error(err)
    }
}

fileOps();

/* fs.readFile(path.join(__dirname,'files','starter.txt'),'utf8',(err,data) => {
    if (err) throw err;
    console.log(data);
}) */

console.log('Hello...');

/* process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})

fs.writeFile(path.join(__dirname,'files','reply.txt'),'Nice to meet you...!',(err) => {
    if (err) throw err;
    console.log('Operation Completed');
})

fs.appendFile(path.join(__dirname,'files','test.txt'),'Testing text.',(err) => {
    if (err) throw err;
    console.log('Append Completed');}) */