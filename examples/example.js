const memeMaker = require('../meme-maker')

const options = {
  image: './spiderman.jpeg',         // Required
  outfile: 'spiderman-meme.png',  // Required
  topText: 'TODAY IM',            // Required
  bottomText: 'AN ASS',           // Optional
  font: './../impact.ttf',      // Optional
  fontSize: 50,                   // Optional
  fontFill: '#FFF',               // Optional
  textPos: 'center',              // Optional
  strokeColor: '#000',            // Optional
  strokeWeight: 2                 // Optional
}

memeMaker(options, function(err) {
  if(e) throw new Error(err)
  console.log('Image saved: ' + options.outfile)
});