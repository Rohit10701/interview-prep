


/*

    3. shadowing

*/

// Global scope
let name = 'John';
console.log(name); // 'John'

function outer() {
 // Outer function scope
 let name = 'Mike'; // Shadows global 'name'
 console.log(name); // 'Mike'

 function inner() {
   // Inner function scope  
   let name = 'Sarah'; // Shadows outer 'name'
   console.log(name); // 'Sarah'

   if (true) {
     // Block scope
     let name = 'Emma'; // Shadows inner 'name'
     console.log(name); // 'Emma'
   }

   console.log(name); // 'Sarah' - block scope ended
 }

 inner();
 console.log(name); // 'Mike' - inner scope ended
}

outer();
console.log(name); // 'John' - outer scope ended




// shadowing vs overriding

// Shadowing Example
let x = 'global';

function demo() {
    let x = 'local';  // New variable, shadows global 'x'
    console.log(x);   // 'local'
}

console.log(x);  // 'global' (unchanged)

// Overriding Example
let y = 'global';

function demo2() {
    y = 'changed';    // Changes existing variable
    console.log(y);   // 'changed'
}

console.log(y);  // 'changed' (modified)