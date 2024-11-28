// Browser Environment
// 1. var declaration
var browserVar = 'I am global';
console.log(window.browserVar); // 'I am global'
console.log(this.browserVar);   // 'I am global' (in non-strict mode)

// 2. let/const declaration
let browserLet = 'Not on window';
console.log(window.browserLet); // undefined
console.log(this.browserLet);   // undefined

// 3. Direct window assignment
window.directGlobal = 'Direct global';
console.log(directGlobal);      // 'Direct global'

// 4. Implicit global (bad practice)
implicitGlobal = 'Not recommended';
console.log(window.implicitGlobal); // 'Not recommended'

// Node.js Environment
// 1. global object
global.nodeGlobal = 'Node global';
console.log(global.nodeGlobal); // 'Node global'

// 2. module scope
var moduleVar = 'Module scoped';
console.log(global.moduleVar);   // undefined

// 3. globalThis (works in both environments)
globalThis.universal = 'Universal global';
console.log(globalThis.universal); // 'Universal global'

// Key Differences:
// 1. Browser: var adds to window, let/const don't
// 2. Node.js: var doesn't add to global
// 3. globalThis works consistently across environments
// 4. Strict mode affects this binding
// 5. Module scope isolates variables