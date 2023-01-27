const { existsSync } = require('fs')
const { promisify } = require('util')
const { exec } = require('child_process')
const shell = promisify(exec)

function generateIdentifyCommand(imagePath) {
  const value = `
    gm identify \
    -verbose \
    ${imagePath}
    `
  const cmd = value.split('\n').join(' ')
  return cmd
}

async function getImageSize(imagePath) {
  const command = generateIdentifyCommand(imagePath)
  const { stdout } = await shell(command)
  const [line] = stdout.trim().split('\n').filter(text => ~text.indexOf('Geometry'))
  const [width, height] = line.trim().replace('Geometry: ', "").split('x')
  return {
    width: Number(width),
    height: Number(height)
  }
}

async function generateConvertCommand(options) {
  const value = `
    gm convert
    '${options.imagePath}'
    -font '${options.font}'
    -pointsize ${options.fontSize}
    -fill '${options.fontFill}'
    -stroke '${options.strokeColor}'
    -strokewidth ${options.strokeWeight}
    -draw 'gravity ${options.topText.position} text 0,${options.topText.top}  "${options.topText.text}"'
    -draw 'gravity ${options.bottomText.position} text 0,${options.bottomText.bottom}  "${options.bottomText.text}"'
    ${options.output}
  `
  const final = value.split('\n').join(' ')
  const { stdout } = await shell(final)
  return stdout
}

async function checkGmBinary() {
  try {
    await shell('gm version')
  } catch (error) {
    if(error.message.includes('command not found')) {
      throw new Error('Gm binary is not present!')
    }
  }
}
const validate = options => {
  // Check if image option is set
  const messages = []
  if (!('image' in options)) {
    messages.push('options.image is required')
  }

  const exists = existsSync(options.image)

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
  if (!messages.length) return

  throw new Error(`Validation error!: \n${messages.join('\n')}`)

}

module.exports = async function (options) {
  await checkGmBinary()
  validate(options)

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
  // const dimensions = await promisify(img.size.bind(img))()
  const dimensions = await getImageSize(options.image)

  // Set text position for top and bottom
  const TOP_POS = Math.abs((dimensions.height / 2) - PADDING) * -1
  const BOTTOM_POS = (dimensions.height / 2) - PADDING

  await generateConvertCommand({
    imagePath: options.image,
    font: FONT,
    fontSize: FONT_SIZE,
    fontFill: FONT_FILL,
    strokeColor: STROKE_COLOR,
    strokeWeight: STROKE_WEIGHT,
    topText: {
      text: TOP_TEXT,
      position: TEXT_POS,
      top: TOP_POS,
    },
    bottomText: {
      text: BOTTOM_TEXT,
      position: TEXT_POS,
      bottom: BOTTOM_POS,
    },
    output: options.outfile
  })

}
