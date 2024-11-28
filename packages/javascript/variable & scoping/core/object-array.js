// const with primitives vs objects
const num = 42;
num = 43;  // Error: Assignment to constant variable

const obj = { count: 0 };
obj.count = 1;    // Works fine
obj = {};         // Error: Assignment to constant variable

// Why this happens:
// 1. const protects the reference/binding
Memory {
   num: 42  // Direct value storage
   obj: ▢ --> { count: 0 }  // Reference to object
}

// 2. Object properties are mutable
obj.count++; // Changes property, not reference
Memory {
   obj: ▢ --> { count: 1 }  // Same reference
}

// To make object immutable:
const frozenObj = Object.freeze({ count: 0 });
frozenObj.count++;  // Error in strict mode, silent fail otherwise

// Arrays work the same way
const arr = [1, 2, 3];
arr.push(4);     // Works: modifying contents
arr = [5, 6, 7]; // Error: changing reference

// Deep freezing objects
function deepFreeze(obj) {
   Object.freeze(obj);
   Object.values(obj).forEach(val => {
       if (typeof val === 'object') deepFreeze(val);
   });
   return obj;
}

const immutableObj = deepFreeze({
   outer: { inner: 42 }
});