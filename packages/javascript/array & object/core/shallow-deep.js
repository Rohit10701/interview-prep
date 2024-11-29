/*

    Explain the difference between shallow and deep copy for nested objects and arrays.

*/

const original = { a: 1, b: { c: 2 } };

const shallowCopy = { ...original };
console.log({shallowCopy})
shallowCopy.b.c = 3;

console.log(original.b.c); // 3 (changes in shallowCopy affect original)
console.log({original})
console.log(shallowCopy.b.c); // 3
console.log({shallowCopy})




const deepCopy = JSON.parse(JSON.stringify(original)); // Simple deep copy
deepCopy.b.c = 3;

console.log(original.b.c); // 2 (original is unaffected)
console.log(deepCopy.b.c); // 3




function customDeepcopy() {
    
}