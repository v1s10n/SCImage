/*const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    plugins: [
        imageminJpegtran({quality: '65-80'}),
        imageminPngquant({quality: '65-80'})
    ]
}).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});
*/
var Jimp = require("jimp");

// open a file called "lenna.png"
Jimp.read("images/banana0.jpg", function (err, lenna) {
    if (err) throw err;
    lenna.resize(100, 100)            // resize
         .quality(60)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .write("build/images/lena-small-bw.jpg"); // save
});
