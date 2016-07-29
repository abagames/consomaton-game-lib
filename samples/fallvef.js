cgl.init({
title: 'FALLV',
rules: `
/// 'f'(sound effect) command's params are equal to 
/// the play function of 'sounds-some-sounds'
/// https://github.com/abagames/sounds-some-sounds
===
v
   v
===r10-s1-fl1 // play a 'l1' sound effect (fl1) when the rule is fired
.  .
   v
===p>-fs1     // play a 's1' sound effect (fs1)
@   @
---p<-fs1     // play the sound effect same as above
 @ @
===n@-fu1,5-o // play 5 'u1' sound effects at the same time
`,
console: `
................










       @
`,

// pixel arts are generated with 'pixel-art-gen'
// https://github.com/abagames/pixel-art-gen

// default options for the generate function
pixel_art_options: { scale: 2, isMirrorX: true },

// generate pixel arts for a each character
pixel_art: {
// pixel art for '@'
'@': `
 x
xx
 x
x
`,
// pixel art for 'v'
'v': `
x
x
 x
 x
`,
// pixel art for '.'
'.': `
 x
 x
x
`,
},

// random seed for generating sound effects and pixel arts
seed: 0,

// 'dev: true' enables the development mode that
// shows the button to change the seed randomly.
// find the proper seed, fill it to the above and erase 'dev: true'
dev: true,
});