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
  topText: 'NEED AN ARK',
  bottomText: 'I NOAH GUY',
  image: noahs-ark.png',
  outfile: 'noahs-ark-meme.png',

}

let filename = meme(options);
```

If successful `meme` returns the filename of the created meme (default: .png), otherwise an exception is thrown.

Other options can also be overridden:

* font
* font size
* font fill
* text position
* stroke color
* stroke weight
