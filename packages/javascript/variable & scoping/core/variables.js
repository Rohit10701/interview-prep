/*

    1. Explain the differences between var, let, and const in terms of scoping and hoisting.

*/


// var: function-scoped, hoisted
var x = 1;
console.log("global x", x) //  1st -> 1
function test_x() {
    // var x = 2;  // Different variable
    console.log("test x", x) // 3rd -> 2
    if (true) {
        console.log("hoisted x", x) // ll give undefined if test x is commented ll not throw error
        var x = 3;  // Same variable as x = 2
        console.log("local x", x) // 5th -> 3
    }
    console.log("new test x", x) // 4th -> 3
}
console.log("new global x", x) // 2nd -> 1




// let: block-scoped, not hoisted

let y = 1;
console.log("global y", y)
function test_y() {
    let y = 2;  // Different variable
    console.log("test y", y) 
    if (true) {
        // console.log("hoisted y", y) // unlike var tthis ll throw error 
        let y = 3;  // Different variable
        console.log("local y", y)
    }
    console.log("new test y", y)

}


test_y()

