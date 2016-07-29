cgl.init({
title: 'FALLV',

rules: `
===       // each rule starts (is separated) with '==='
/// rules change a pattern (3 x 3 characters) in a console
v         // pattern: 'v  ' -> changes into '   '
   v      //          '   '                 'v  '
          //          '   '                 '   '
/// a rule can have commands that are classified in 3 types
///  condition: condition to fire a rule
///   (r)andom, (i)nterval, (p)ad, (e)xists, (n)ot exists, (c)ount
///  event: event occurs when a rule is fired
///   (s)core, game (o)ver, sound e(f)fect
///  rule: generate additional rules
///   (d)irection, (k)eep
///
/// commands are separated with '-'
/// a command can have multiple arguments separated with ','
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

// initial console state
console: `
................










       @
`,
});