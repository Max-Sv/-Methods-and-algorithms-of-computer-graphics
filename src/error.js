const fs = require('fs');
const argumentErrorHandler = (inputImgPath, inputFilePath) => {
    if (!shift || !action) { 
        errorHandler(new Error('Required arguments are missing'));
    }
}
const accessFileErrorHandler = (input) => {
    if (input) {
        fs.access(input, fs.constants.R_OK, err => errorHandler(err));
    }
}
function errorHandler(err) {
    if (err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
    }
}

module.exports = {
    accessFileErrorHandler,
    argumentErrorHandler,
    errorHandler
}