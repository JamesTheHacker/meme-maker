const gm = require('gm').subClass({ imageMagick: true });
const { existsSync } = require('fs')
const { promisify } = require('util')

const validate = options => {
  // Check if image option is set
  const messages = []
  if (!('image' in options)) {
    messages.push('options.image is required')
  }

  const exists = existsSync(options.image);

  // If file does not exist return error
  if (!exists) {
    messages.push(`File does not exist: ${options.image}`)
  }

  // Check to see if output file is set
  if (!('outfile' in options)) {
    messages.push('options.outfile is required')
  }

  // Check if topText or bottomText is set
  if (!('topText' in options) && !('bottomText' in options)) {
    messages.push('options.topText or options.bottomText is required')
  }
  if (!messages.length) return;

  throw new Error(`Validation error!: \n${messages.join('\n')}`)

}

module.exports = async function (options) {

  validate(options)

  // Create new graphicsmagick instance
  const img = gm(options.image)

  // Set some defaults
  const TOP_TEXT = 'topText' in options ? options.topText : ''
  const BOTTOM_TEXT = 'bottomText' in options ? options.bottomText : ''
  const FONT = 'font' in options ? options.font : __dirname + '/impact.ttf'
  const FONT_SIZE = 'fontSize' in options ? options.fontSize : 50
  const FONT_FILL = 'fontFill' in options ? options.fontFill : '#FFF'
  const TEXT_POS = 'textPos' in options ? options.textPos : 'center'
  const STROKE_COLOR = 'strokeColor' in options ? options.strokeColor : '#000'
  const STROKE_WEIGHT = 'strokeWeight' in options ? options.strokeWeight : 2
  const PADDING = 'padding' in options ? options.padding : 40

  // Get the image size to calculate top and bottom text positions
  const dimensions = await promisify(img.size.bind(img))()

  // Set text position for top and bottom
  const TOP_POS = Math.abs((dimensions.height / 2) - PADDING) * -1
  const BOTTOM_POS = (dimensions.height / 2) - PADDING

  // Write text on image using graphicsmagick
  const instance = img.font(FONT, FONT_SIZE)
    .fill(FONT_FILL)
    .stroke(STROKE_COLOR, STROKE_WEIGHT)
    .drawText(0, TOP_POS, TOP_TEXT, TEXT_POS)
    .drawText(0, BOTTOM_POS, BOTTOM_TEXT, TEXT_POS)

  await promisify(instance.write.bind(instance))(options.outfile)
}
