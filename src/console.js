
let argv = require("minimist")(process.argv);

const getInputImg = () => argv.i || argv.input;
const getOutputImg = () => argv.o || argv.output;
const getInputFile = () => argv.c || argv.create;
const getOutputFile = () => argv.a || argv.action;
module.exports = {
    getInputImg,
    getOutputImg,
    getInputFile,
    getOutputFile,
};