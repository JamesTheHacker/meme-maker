const memeMaker = require('../meme-maker')

const options = {
  image: './spiderman.jpeg',         // Required
  outfile: 'spiderman-output.png',  // Required
  topText: 'HEY',            // Required
  bottomText: 'CHICKEN',           // Optional
  font: './../impact.ttf',      // Optional
  fontSize: 50,                   // Optional
  fontFill: '#FFF',               // Optional
  textPos: 'center',              // Optional
  strokeColor: '#000',            // Optional
  strokeWeight: 2                 // Optional
}

memeMaker(options).then(_ => {
  console.log('Image saved: ' + options.outfile)
}).catch(error => console.log(error));