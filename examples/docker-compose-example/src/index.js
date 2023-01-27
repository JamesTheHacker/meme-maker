import memeMaker from '@erickwendel/meme-maker'

await memeMaker({
    image: './img/sorry.jpg',       // Required
    outfile: 'spiderman-meme.png',  // Required
    topText: 'HOW I FEEL WHEN',     // Required
    bottomText: 'THEY PLAY MY SONG',// Optional
    fontSize: 50,                   // Optional
    fontFill: '#FFF',               // Optional
    textPos: 'center',              // Optional
    strokeColor: '#000',            // Optional
    strokeWeight: 2                 // Optional
})