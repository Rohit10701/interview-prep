// Without declaration keyword (implicit global)
x = 10; 

// What actually happens:
window.x = 10; // In browser
global.x = 10; // In Node.js

// Strict mode:
"use strict";
y = 20; // ReferenceError: y is not defined

// Problems with implicit globals:
function first() {
   a = 1; // Creates global
}
function second() {
   a = 2; // Modifies same global
   console.log(a); // 2
}

// Accidental overwrites:
function third() {
   window.name = "test"; // Overwrites window.name
   console.log(name); // "test"
}

// Always declare with let/const:
let z = 30;  // Proper scoping
const w = 40; // Proper scoping


// Key issues with implicit globals:

// Pollutes global namespace
// No TDZ protection
// Accidental overwrites
// Harder debugging
// Fails in strict mode