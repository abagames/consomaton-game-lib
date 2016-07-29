cgl.init({
title: 'REF ARROW',
rules: `
/// 'd'(direction) command creates the rotating patterns
/// (d[rotating count],[rotating characters],[pad inputs condition])
///  [rotating count] rotate '4' directions (90 degrees) or 
///                   '2' directions (180 degrees) (default: 4)
///  [rotating characters] these characters in a pattern are rotated
///  [pad inputs condition] add 'p' command to each rule
===d,>v<^-fh1
>. <.
/// the above rule are expanded in below 4 rules
/// ===
/// >. <.
/// ---
/// v  ^
/// .  .
/// ---
/// .< .>
/// ---
/// .  .
/// ^  v
===d,>v<^
>   >
/// each expanded rule has 'p' command, p>, pv, p< and p^
===d,>v<^,>v<^-s-fl1
@   @>
===n@-fu1,5-o
`,
console: `
................
.              .
.              .
.              .
.              .
.              .
.              .
.              .
.       @      .
.              .
.              .
.              .
.              .
.              .
.              .
................
`,
pixel_art_options: { scale: 2, isMirrorX: true, isMirrorY: true },
pixel_art: {
'>v<^': [`
xx
  xx
`, { isMirrorX: false }],
'@': `
 x
xx
`,
'.': `

 x
`,
},
seed: 3861939
});