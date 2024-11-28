// Hoisting Visual Memory Model
{
    // Memory setup phase (before execution):
    var x;  // hoisted: undefined
    let y;  // hoisted: uninitialized (TDZ)
    // function declarations hoisted with definition
 
    // Code as written:
    console.log(x); // undefined
    console.log(y); // ReferenceError (TDZ)
    var x = 1;
    let y = 2;
 }
 
 // Function Declaration vs Expression
 sayHi();  // "Hi" - works
 multiply(); // TypeError - not a function
 
 // Functions as written:
 function sayHi() { // Hoisted with definition
    console.log("Hi");
 }
 
 var multiply = function() { // Only variable hoisted as undefined
    return a * b;
 }
 
 // Hoisting Order:
 // 1. Function declarations (with body)
 // 2. Variables
 //    - var: undefined
 //    - let/const: uninitialized (TDZ)
 //    - function expressions: treated as variables
 
 // Memory visual:
 
 CREATION PHASE:
 window = {
    sayHi: function() {...},  // Full function
    multiply: undefined,      // Just variable
    x: undefined             // var variable
    // y not attached (let)
 }
 
 EXECUTION PHASE:
 window = {
    sayHi: function() {...},
    multiply: function() {...},
    x: 1
 }

//  Key effects:

// var accessible before declaration (undefined)
// let/const inaccessible before declaration (TDZ)
// Function declarations fully hoisted
// Function expressions hoisted as variables
// Can cause unexpected behavior if not understood