cgl.init({
title: 'CROSSMAN',
rules: `
===
t   t
---
 c c
===r9-ka
3  2__
---r9-fc1
2  1//
---r9
1  3__
===
_  _
a  a
---p^-fh1
   a

a
---kaA@
-  -
   #
#  #
===
a  a
#  #
---
a  a

#  #
---pv-fh1
a

   a
===
@  A
---
A  a
===
.. ..
a  b
===eb-s-fc2
   @
#==#==
---eb
b  .
===r30-fl1
T  Ttt
---r15-fl2
 C cC
===naA@-fu1,5-o
`,
console: `


         -------
       ..|   ||
         =======
======3__=======
               C
-------  -------
               C
  ====    ====
T
-------  -------
T
=======--=======
       a
       #==
`,
pixel_art_options: {scale: 2, isMirrorY: true},
pixel_art: {
'aA@000': [`
 x
xx
 x
xx
`, {isMirrorX: true, isMirrorY: false}],
't': `
xx x
xx x
`,
'c': `
 x x
xxxx
`,
'0001230000': `

xxxx
`,
'TC': `

 --
`,
'#': '',
'.': '',
'_': [`



****
`, {isMirrorY: false}],
'/': [`
   *
  *
 *
*
`, {isMirrorY: false}],
'|': [`
 *
 *
 *
 *
`, {isMirrorY: false}],
'=': `

****
`,
'-': `

oooo
`,
},
seed: 3081645
});