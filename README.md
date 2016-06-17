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
let meme-maker = require('meme-maker')

let options = {
  image: 'spiderman.png',         // Required
  topText: 'TODAY IM',            // Required
  bottomText: 'AN ASS',           // Optional
  outfile: 'spiderman-meme.png',  // Optional
  font: '/path/to/font.ttf',      // Optional
  fontSize: 50,                   // Optional
  fontFill: '#FFF',               // Optional
  textPos: 'center',              // Optional
  strokeColor: '#000',            // Optional
  strokeWeight: 2                 // Optional
}

meme-maker(options, function(image) {
  console.log(image)
});
```

`meme-maker` accepts an options object as it's first paramater and a
callback function as its second paramater. Upon success a string containing
the newly created filename is returned.

Default Values
--------------

The following options have default values set:

* **outfile:** Randomly generated filename
* **font:** impact.ttf
* **fontSize:** 100
* **fontFill:** #FFF
* **textPos:** center
* **strokeColor:** #000
* **strokeWeight:** 2
