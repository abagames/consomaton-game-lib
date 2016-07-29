consomaton-game-lib
======================
Write a game with rules for a cellular automaton.

Rules are the same as rules of the programming puzzle game
[consomaton](https://github.com/abagames/consomaton)
but slightly changed.

![screenshot](http://abagames.sakura.ne.jp/16/cgl/screenshot.gif)

### How to write rules

See the sample source code.

[play FALL V](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QDECCAZdA1EAaEATgK5wDOiIAvNQAR300A6AdgG4NPP3ucefWUCARgAMAWlJDOAOjqzedViwEAHAHwcWAAXo6WYgyoA8mrjp39qzLWID29FizwgAxrealbcCi2l--AYHSjswhYaERIXw0Wk4AvkA)

[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/fallv.js)

Without comment

```
rules: `
===
v
   v

===r10-s1
.  .
   v
===p>
@   @
---p<
 @ @
===n@-o
`,
```

With comments

```
rules: `
===       // each rule starts (is separated) with '==='
/// rules change a pattern (3 x 3 characters) in a console
v         // pattern: 'v  ' -> changes into '   '
   v      //          '   '                 'v  '
          //          '   '                 '   '
/// the rule can have commands that are classified in 3 types
///  condition: condition to fire a rule
///   (r)andom, (i)nterval, (p)ad, (e)xists, (n)ot exists, (c)ount
///  event: event occurs when a rule is fired
///   (s)core, game (o)ver, sound e(f)fect
///  rule: generate additional rules
///   (d)irection, (k)eep
///
/// commands are separated with '-'
/// the command can have multiple arguments separated with ','
===r10-s1 // with a probability of 1/10 (r10), add 1 score (s1) and
.  .      // '.' spawns 'v'
   v
===p>     // if a right button of a pad is pressed (p>)
@   @     // '@' moves right 
/// '---' rule separator means that below rules are not fired
/// when any above rule fires already
---p<     // if a left button of a pad is pressed (p<)
 @ @      // '@' moves left
===n@-o   // if there is no '@' (n@) on the console, game is over (o) 
`,
```

### Rules with sound effects

Sound effects are generated with [sounds-some-sounds](https://github.com/abagames/sounds-some-sounds)

[play FALL V with effects](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QDECCAZdA1EAaEATgK5wDOiIAvNQDoB2AbvQAStN3WUECMADALSlu-AGbRuzegDpWUlm3qcADgD5RQ1pvoABTdvr9DSgDzqJmyXWa79HanW2ii3XAFZ+Ae0v08IAMYedKQecBTSUhGRUdH0sXRxCfFJ8hbWPvhKEAAesNAA+gCGBGB5HkqQgeQIoKR+BaEIAEz4EKQAshAEBB4EABqIYMSwAL4Z2bmFxYig2mFWWfRZC-OL6SAMc8vLzNvLvlJzOyxbPqMgpLCwACaIvPhXsBsIg0QjQA)

[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/fallvef.js)

```
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
```

### Pixel arts

Pixel arts are generated with [pixel-art-gen](https://github.com/abagames/pixel-art-gen).

```
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
```

### Other commands

[play REF ARROW](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QCUCiAxABAQWcg8gOogA0IATgK5wDOiIAvEwCYkB8AbgDwB6AtADMAFgEYAOgDs2AOkxdpkpg1adektpk1tFLdtx57efGoOjiJAAU2YL2iUsuDKIkgFY+Ae0mTSIAMYeEjQecPSS0hGRUdEKErLWCYmYsfFJSSlpaRmZidk51nn5yeFFBSVJVrnlpYX5tTn1mY1Z1UUpMR0RPmQADhAAHrDQAPoAhuRgwx49kIF0CKA0fqOhCABMZBA0ALIQ5OQe5AAaiGBUsJs7ewfkAJqn5wC+vQNDYxOIoKo8iADaIJJ+v1JJogd1QFtdvtDicEAIVjRYI8ALpkCxhCSYYESMESXzSDEg7EgZ4gRGwZiIADMAA4AGwiACcVMZjyAA)

[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/refarrow.js)

```
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
```

[play PROPAG](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QAUBKB5ZBBA4iANCAE4CucAzoiALy0AmAtOQwGYDGAjADoB2AAgCEABH161qjZu278ARiLH0ATPgGyGAaz5DewoUIGLqEJbwBUvfUIs9xJzaJ6GeV53aUPesy-u+36+AB8AG4APAB6DEQALAAMmgB05vpmNuJEAMzxdCpqrNAyZilutEQArPEs5DIJ+kkuKUZ0QWHhLRGaNtr6juL8rCQc+GUMAPa8vAQgbKM85KNwVLwJK6tr6-UTPFs72w1WCjxTAA4QAB6w0AD6AIZEYFejx5CzlAig5Gw3iwgqIBDkACyECIRFGRAAGogwKRYIQAcDQeCAJrQ2EAX0Ipwu1zuYEQoD4SxcZ14ZwYk0ICWJQlJR0IZmJdKE43pIDUiAA2iAfKM+az9KMrAKWcLefzeWKGkLBeK+ZSPl8fkN-kCQWDIYgWN9yHDVYiNaiENroLr0QBdTEgXWwOiILLRACcsTKAHZ0UA)

[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/propag.js)

```
===d-s-fc1
@B @
===d-s-fc1
@b @
/// 'k'(keep) command means the characters in the first arg are
/// not affected by the rules until the next '===' separators
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
```
[play GGLIFE](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QHFkAIAyBJAYgURABoQAnAVzgGdEQBeegE0MID4A3AHgD0BaSngGaUAjAB0AdgAE0aAHSSJ9WgGMAzIQD2EiWmlot42UbWa028XJkGjs5QCZN5-VYk2TBnRpeGjEr3MV6cQ0eEgBWAAYIngBrSUEACzELKw0DJQZQ4SjouMS7HW8lKUEyYUIwng9xIhBlDXFKDTgaVxt2jps2zva03x8emz7ZbrSNQf6Jnu6proHZyamxxYnxuYW1kfmFmZ3t2d3JKd2D-eOa4gAHCAAPWGgAfQBDEjAHjUvIBuoEUEplJ4tBAOEAQSgAWQgJBIGhIAA1EGByLBiGDIdDYQBNRHIgC+V1u92er0QoFkNFqkla4huOlpFxAGmpPB4EhZEhA+JAlFgsAYiGEYQA7AAOYTCVS4oA)

[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/gglife.js)

```
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
```

### Other examples

[play CROSSMAN](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QGEBKB5AypgsgQQDkQAaEAJwFc4BnREAXkYB0A7MAAk7FYFo-X2AYyGtG9MgE4eAawCGrAMycATAH1VvPpJ4AzQQEZWyzvoD0pzT0mt9nBetHMWqzhpazO8lnx4AHAHq6ABaGLJzsXqxePnJ4AAK8nDwCnADErKlpjvRRnhlZ3vzueSz57OmFfgBuwaGRYSVirHGceJaseI1OAHTd7L257ABG2bBDPNS6gsop7AksqYyLOZVjrEOc3dlkCgAMutChACqcR2DclWT6AKwHM2HIQsjZ7vG6FPrEtwD2rKwkIEE3xY1G+cDof1KDXCMJ8cNmMN6AB9wkikQiYewxNjsmJ7KpsU1oZiSexnpU4Uk4UVSbTyZxsTCcSwjpZKexqUVWSxCYw+LyVqSvKTlv9SL4IAAPWDQVSyMhgVTfXyQYG0BCgaiCWTghDKUgQag4CBkMjfMgATUQYEosAAvuKpTK5QrEKBZPFdl7EABtEACSWsSWBsIh4Ni0CG42m80ADWttoNRpNZstiB0Ouo9oAuqQwBCWMH2GHJcWxYCC8Wy4XgyGAV7dvplHsGwWg7Xy0dkG2wkUAak6ADuoPSKpff6oZCAFQzqcRkBRlPmq0IDPQLN23MgUzj2Zzhr79j7-ckSPJmNp1eZnOkJG7sKHx8CE-EM-R1Mrtcbrf0Huzl8gDwPbfCBvwsCADogFmsAACaIHsAAc+gAGwACzXHaQA)
(
[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/crossman.js)
)

[play BARR](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QCECCAldIA0IBOArnAM6IgC8lAJgEzYB6AbtgDwB8AtAGbQCMAOgDs2AAhH0hHKbVZtZ3PkPpiWk6XSbY2LBQMEsxEwVI4z2WnTz2MVQyuSpbGLeh2K8ADN1h62yEWwAGnaUANZszkZiIgAecUIigbHxgtFxMWocCWIAdHkJMSJ5OdlF+YL2VN40QjH+McEV1E4uHKEAxG5CoiLtbCEOHHgArB5jbfQRlu6lyAPCkdwEvNjDHAD2QkI4IADG64LE63BkW4JnF+ep0QHbuAAOEDGw0AD6AIZ4YK-r95AHpAQoGIu3eJwQdBAEGIAFkIHg8Os8IFEGBCLBcNC4QikQBNVHogC+DyeLw+X0QoCm9EQAG0QLUMtcUjhQFj4YjkYguGDiLBCQBdXDtU7GLJiu4oUWxRmSlFIITrTaCJWSmLS5XKnY5aUJLXEkB82BURAATgALAA2Gi8U0AZkJQA)
(
[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/barr.js)
)

[play FALL V JUMP](http://abagames.sakura.ne.jp/16/cgl/index.html?v=1&d=N4IgLglmA2CmIC4QDECCAZdACAalgUgKoCyACiADQgBOArnAM6IgC8bAOgHZYC0vXbFlywteQzoOoBOHgDMGARgFYsAegFtqAZjkMATF1UrxggA4A+HgGsAblwACKrPa483pgDzDHLiW1MAejwM1jYAdLoArMIqvr5uPA6xriqJnAlJWACGGiwWoVxZTjnp7l7cRSWCtoXJ6amuboUx2blcdvX8pWkdTh2SWgAMctBKnGEqYS39bJz2WXK0ChSRPAD2XFyUIADGa5wMa3DMXGFn5xeXm5zXtzf3dy11CS+vCeJbVKYQAB6w0AB9LLUMAAtamSD7JgIUAMHZZY4IPRUCAMYgQajUNbUAAaiDAdFgAF8vr9-kCQYhQIN7IM6fSsiduD8uD8WczWZ8QDwmXc1htONsWKo6bz7lh2WyuTYmZLhOyJVywkzFRzOOyQCSQAxYLAACaIAAckUNAHYpFoFESgA)
(
[source code](https://github.com/abagames/consomaton-game-lib/blob/master/samples/fallvjump.js)
)

License
----------
MIT
