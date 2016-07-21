const fs = require('fs');
const execSync = require('child_process').execSync;

function splitFile(fileName, index) {
    execSync('mp3splt\\mp3splt.exe -f -T 12 -t 5.0 -o ' + ('00'+index).slice(-2) + '@h@m@s-@f "' + process.argv[2]+"\\"+fileName + '"');
    fs.unlinkSync(process.argv[2]+"\\"+fileName);
}

function sortFiles(files) {
    files.sort(function (a,b) {
        return parseInt(a) - parseInt(b);
    });
}

function cleanFileName(fileName) {
    return fileName.replace(/[0-9\-]/g, '')+"3";
}

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

var files = fs.readdirSync(process.argv[2]);
sortFiles(files);
files.forEach((value, index) => {
    splitFile(value, index);
});
files = fs.readdirSync(process.argv[2]);
sortFiles(files);
files.forEach((value, index, array) => {
    fs.renameSync(process.argv[2]+"\\"+value, process.argv[2]+"\\"+('000'+index).slice(-3)+"-"+cleanFileName(value));
});
// mp3splt\mp3splt.exe -t 5.0 -o 00@h@m@s-@f sample.mp3

