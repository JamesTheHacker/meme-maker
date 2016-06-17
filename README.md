Meme Maker
==========

**[Meme Maker](https://www.npmjs.com/package/meme-maker)** is a package that allows you to quickly, and easily, generate memes such as the one below:

![Example of meme created with Meme Maker](http://i.imgur.com/2s8NYvM.png)

**You must have [graphicsmagick](http://www.graphicsmagick.org/index.html) installed for this package to work.**

Install
-------

    npm install meme-maker --save

Usage
-----

Using Meme Maker is easy!

```
let memeMaker = require('meme-maker');

let options = {
  topText: 'TODAY IM',
  bottomText: 'AN ASS',
  image: 'spiderman.png',
  outfile: 'spiderman-meme.png',
}

let filename = memeMaker(options);
```

If successful `memeMaker` returns the filename of the created meme, otherwise an exception is thrown.

Other options can also be overridden:

* font
* fontSize
* fontFill
* textPos
* strokeColor
* strokeWeight
