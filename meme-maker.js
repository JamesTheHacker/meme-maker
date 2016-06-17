let fs = require('fs')
let gm = require('gm')

module.exports = function(options) {
  fs.exists(options.image, (exists) => {
    if(!exists) throw new Error('File does not exist: ' + options.image);

    // Create new graphicsmagick instance
    let img = gm(options.image)

    // Set some defaults
    const FONT = (('font' in options)) ? options.font : __dirname + '/impact.ttf'
    const FONT_SIZE = (('fontSize' in options)) ? options.fontSize : 50
    const FONT_FILL = (('fontFill' in options)) ? options.fontFill : '#FFF'
    const TEXT_POS = (('textPos' in options)) ? options.textPos : 'center'
    const STROKE_COLOR = (('strokeColor' in options)) ? options.strokeColor : '#000'
    const STROKE_WEIGHT = (('strokeWeight' in options)) ? options.strokeWeight : 2

    // Get the image size to calculate top and bottom text positions
    img.size(function(err, dimensions) {

      // Set text position for top and bottom
      const TOP_POS = Math.abs((dimensions.height / 2) - 40) * -1
      const BOTTOM_POS = (dimensions.height / 2) - 40

      // Write text on image using graphicsmagick
      img.font(FONT, FONT_SIZE)
         .fill(FONT_FILL)
         .stroke(STROKE_COLOR, STROKE_WEIGHT)
         .drawText(0, TOP_POS, options.topText, TEXT_POS)
         .drawText(0, BOTTOM_POS, options.bottomText, TEXT_POS)
         .write(options.outfile, function(err) {
           if (err) throw new Error('Failed to save meme: ' + err)
           return options.outfile;
         })
    })
  })
}
