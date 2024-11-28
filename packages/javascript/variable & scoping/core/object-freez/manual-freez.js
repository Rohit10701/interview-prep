let obj = { name: "test" };

// Method 1: Using Object.defineProperty
Object.defineProperty(obj, 'name', {
   configurable: false,  // Can't delete property
   writable: true,      // Can still change value
   enumerable: true,    // Can be listed in loops
   value: "test"
});

// Method 2: Using Object.defineProperties for multiple
Object.defineProperties(obj, {
   'name': {
       configurable: false,
       writable: true,
       value: "test"
   },
   'age': {
       configurable: false,
       writable: true,
       value: 25
   }
});

// Now cannot:
delete obj.name;  // Fails
// But can:
obj.name = "new"; // Works (writable is true)

// Check property descriptor
console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
// { value: "test", writable: true, enumerable: true, configurable: false }