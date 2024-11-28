// Function Scope (var)
function functionScope() {
    var x = 1;
    
    if (true) {
        var x = 2;    // Same variable as outer x
        console.log(x);  // 2
    }
    
    console.log(x);   // 2 (value changed)
}

// Block Scope (let/const)
function blockScope() {
    let x = 1;
    
    if (true) {
        let x = 2;    // New variable, different from outer x
        console.log(x);  // 2
    }
    
    console.log(x);   // 1 (unchanged)
}

// Function Scope Leakage
function functionLeakage() {
    if (true) {
        var leaked = "I'm available outside";
    }
    console.log(leaked);  // "I'm available outside"
}
// console.log(leaked) // "Reference error"

// Block Scope Containment
function blockContainment() {
    if (true) {
        let contained = "I'm block-scoped";
    }
    console.log(contained);  // ReferenceError
}

// Block Scope in Loops
for (let i = 0; i < 3; i++) {
    // Each iteration gets new 'i'
    console.log("let loop", i)
}
console.log("let loop outside", i) // gives reference error if we comment var loop else undefined because of var hoisting

for (var i = 0; i < 3; i++) {
    // Same 'i' throughout
    console.log("var loop", i)
}
console.log("var loop outside", i) // leaks

// Major Differences:
// 1. var: Function-scoped, ignores blocks
// 2. let/const: Block-scoped, new scope per block
// 3. var leaks outside blocks, let/const don't
// 4. let/const create new bindings in loops
// 5. var has looser scoping rules