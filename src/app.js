
const Jimp = require("jimp");
const sizeOf = require('image-size');
const fs = require('fs');
class App {
    constructor(console) {
        
        const { getInputImg, getOutputImg, getInputFile, getOutputFile } = console;
        this.inputImgPath = getInputImg();
        this.outputImgPath = getOutputImg() || 'newIMG.png';
        this.inputFilePath = getInputFile();
        this.outputFilePath = getOutputFile();
        if (this.inputImgPath) this.getImgSize();
        this.writableStream = fs.createWriteStream(this.outputFilePath || './rgba.txt', { flags: 'a' });
        this.readableStream = this.inputFilePath ? fs.createReadStream(this.inputFilePath, "utf8") : process.stdin;
      }
    async run() {
        try {
            if (this.inputImgPath) {
              const img = await Jimp.read(this.inputImgPath)
              await  process.stdout.write("Creating rgba text file. Please wait...\n")
              for (let i = 1; i <= this.imgHeight; i++) {
                for (let j = 1; j <= this.imgWidth; j++) {
                  let color = img.getPixelColor(j, i);
                  let {r, g, b, a} = Jimp.intToRGBA(color);
                  this.writableStream.write(`${r},${g},${b},${a};`)
                  if (j === this.imgWidth) this.writableStream.write("!")
                }
              }
              this.writableStream.end();
              await process.stdout.write('Operation was a success\n');
            }
            if (this.inputFilePath) {
              const self = this;
              let arrRow = []
              let rgbaText = ''
              this.readableStream.on('data', chunk => rgbaText += chunk);
              this.readableStream.on('end', () => {
                arrRow = rgbaText.split('!');
                arrRow = arrRow.map( row => row.split(';').map(rgba => this.getHexColor(rgba)))
                this.imgWidth = arrRow[0].length - 1;
                this.imgHeight = arrRow.length - 1;
                let image = new Jimp(this.imgWidth, this.imgHeight, function (err, image) {
                  if (err) throw err;
                  arrRow.forEach((row, y) => {
                    row.forEach((color, x) => {
                      image.setPixelColor(color, x, y);
                    });
                  });
                  image.write(self.outputImgPath, (err) => {
                    if (err) throw err;
                  });
                });
    
              });
            }
        }
        catch (err) {
            errorHandler(err);
        }
    }
    getImgSize() {
        const {width, height} = sizeOf(this.inputImgPath);
        this.imgWidth = width;
        this.imgHeight = height;
    }
    getHexColor(rgba) {
      let [ r, g, b, a] = rgba.split(',');
      let hex = Jimp.rgbaToInt(parseInt(r), parseInt(g), parseInt(b), parseInt(a))
      return hex;
    }
    checkErorr() {
        try {
            argumentErrorHandler(this.inputImgPath, this.inputFilePath);
            accessFileErrorHandler(this.inputFilePath);
        }
        catch (err) {
            errorHandler(err);
        }
    }
}


module.exports = App;