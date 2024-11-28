// Nested Scope Example
const global = "I'm global";

function outer() {
   const outerVar = "I'm outer";
   
   function middle() {
       const middleVar = "I'm middle";
       
       function inner() {
           const innerVar = "I'm inner";
           
           // Scope Access:
           console.log(innerVar);   // Own scope
           console.log(middleVar);  // Parent scope
           console.log(outerVar);   // Grandparent scope
           console.log(global);     // Global scope
       }
       
       inner();
       console.log(innerVar);   // ReferenceError
   }
   
   middle();
   console.log(middleVar);  // ReferenceError
}

outer();
console.log(outerVar);   // ReferenceError


// Key Points:

// Inner functions can access outer variables
// Outer functions cannot access inner variables
// Each function creates new scope
// Lookup goes up scope chain
// Cannot skip scope levels in chain

// This is called Lexical Scoping or Closure Scope.



// Explanation

// Lexical Scoping means:

// Functions maintain link to their birth scope (where defined)
// Inner function has access to variables from:

// Own scope
// Parent function's scope
// Parent's parent scope
// All the way up to global



// Memory Structure:

// Each function creates closure
// Closure contains:

// Local variables
// [[Scope]] link to outer scope


// Forms chain for variable lookup
// Memory persists as long as function exists

// This is why inner functions can access outer variables but not vice versa.