const fs = require('fs');
const execSync = require('child_process').execSync;

function splitFile(fileName, index) {
    execSync(process.argv[1].substr(0, process.argv[1].lastIndexOf('\\')) + '\\mp3splt\\mp3splt.exe -f -T 12 -t 5.0 -o ' + ('00' + index).slice(-2) + '@h@m@s-@f "' + process.argv[2] + "\\" + fileName + '"');
    fs.unlinkSync(process.argv[2] + "\\" + fileName);
}

function sortFiles(files) {
    files.sort(function (a, b) {
        return parseInt(a) - parseInt(b);
    });
}

function cleanFileName(fileName) {
    return fileName.replace(/[0-9\-]/g, '') + "3";
}

var files = fs.readdirSync(process.argv[2]);
sortFiles(files);
files.forEach((value, index) => {
    splitFile(value, index);
});
files = fs.readdirSync(process.argv[2]);
sortFiles(files);
files.forEach((value, index, array) => {
    fs.renameSync(process.argv[2] + "\\" + value, process.argv[2] + "\\" + ('000' + index).slice(-3) + "-" + cleanFileName(value));
});

