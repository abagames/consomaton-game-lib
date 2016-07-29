cgl.init({
title: 'GG LIFE',
rules: `
===d,,>v<^-s-fs1
@  .@
/// 'c'(count) command represents a condition that is fired when
/// a specific number (first arg) of a specific character (second arg)
/// exists on a before pattern 
===c3,o

 @  o
...c3,o // '...' separator means these rules are applied simultaneously

 .  o
...c2,o

 o  o
...c3,o

 o  o
...
o  .
===no-r500-k@-fh1
   ooo
===d-r1000-k@-fh2
   o
===n@-fu1,5-o
`,
console: `
................
............oo..
............oo..
...ooo..........
................
................
................
...........ooo..
...........o....
............o...
................
................
................
.....@..........
................
................
`,
pixel_art_options: { scale: 2, isMirrorX: true, isMirrorY: true },
pixel_art: {
'.': '',
'@': `
x
 x
`,
'o': `
--
--
`,
},
seed: 1578113
});