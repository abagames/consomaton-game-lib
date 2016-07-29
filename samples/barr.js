cgl.init({
title: 'BARR',
rules: `
===d2,^v,<>-fl1
>  ^
---d2,<>,<>-fl1
^  <
---d2,^v,><-fl1
<  ^
---d2,<>,><-fl1
v  <
===d,>v<^-s10-fe1
>B >X
===k>v<^
   xxx
 X xxx
   xxx
---
   ...
 x ...
   ...
===d-fe2
xB xX
===d,>v<^-k#-s
>  #>
===d-r5000-k^>v<-fs1
   B
===n>v<^-fu1,5-o
`,
console: `







     >
`,
pixel_art_options: { scale: 2, isMirrorX: true, isMirrorY: true },
pixel_art: {
'>v<^': [`
xx
  xx
`, { isMirrorX: false }],
'#': `
--
--
`,
'B': `
 x
xx
`,
'X': `
oo
oo
`,
'x': `
 o
o
`,
'.': `
 
 o
`,
},
seed: 9462193
});