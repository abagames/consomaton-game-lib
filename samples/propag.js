cgl.init({
title: 'PROPAG',
rules: `
===d-s-fc1
@B @
===d-s-fc1
@b @
/// 'k'(keep) command means the characters in the first arg are
/// not affected by the rule
===d2,Bb-k@ 
B   B
===i2
*
   *
/// the rule with the 'i'(interval) command is fired at
/// a specific frame (first arg) intervals
===i2-k@
B
   B
===i2-k@
b
   b
===d,>v<^-r40-k.
*  **
===r30-d2,Bb-fl1
*  *B
===r50-fs1
.  .
   *
===d,>v<^,>v<^-k*
@   @
===n@-fu1,5-o
`,
console: `
................








      @
`,
pixel_art_options: { scale: 2, isMirrorX: true, isMirrorY: true },
pixel_art: {
'@': `
 x
x-
`,
'.': `
 x
`,
'*': `
x
 o
`,
'Bb': [`
  oooo
  o   o
  o   o
  oooo
  o   o
  o   o
  oooo
`, { scale: 1, isMirrorX: false, isMirrorY: false}]
},
seed: 3049057
});