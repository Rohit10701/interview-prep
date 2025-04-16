# JavaScript Interview Questions (Core Concepts Only)

This document contains **200 JavaScript interview questions** that focus **only on core JavaScript** concepts commonly asked in **frontend interviews**. Topics include **polyfills, asynchronous handling, functional programming, event handling, prototypes, and browser-related utilities**.

Each section is **prioritized** based on **how frequently** these questions are asked in interviews. 🚀

---

## 📌 **Priority 1: Must-Know Questions (Most Common in Interviews)**
### **1. Promise & Async Handling**
1. Implement `Promise.all` (Polyfill)
2. Implement `Promise.race` (Polyfill)
3. Implement `Promise.allSettled` (Polyfill)
4. Implement `Promise.any` (Polyfill)
5. Implement `setTimeout` (Polyfill)
6. Implement `setInterval` (Polyfill)
7. Implement `clearTimeout` (Polyfill)
8. Implement `clearInterval` (Polyfill)
9. Implement `sleep(ms)` function using `Promise`
10. Implement a retry mechanism for a failed `Promise`
11. Implement an async queue with concurrency control
12. Implement an async pool executor
13. Implement a function that retries a Promise `n` times before failing
14. Implement an async memoization function
15. Implement a race condition handler in JavaScript

### **2. Functional Programming & Array Methods**
16. Implement `map` (Polyfill)
17. Implement `filter` (Polyfill)
18. Implement `reduce` (Polyfill)
19. Implement `forEach` (Polyfill)
20. Implement `find` (Polyfill)
21. Implement `findIndex` (Polyfill)
22. Implement `some` (Polyfill)
23. Implement `every` (Polyfill)
24. Implement `flat` (Polyfill)
25. Implement `flatMap` (Polyfill)
26. Implement function currying (`curry`)
27. Implement function composition (`compose`)
28. Implement function piping (`pipe`)
29. Implement a simple memoization function
30. Implement a function to cache API responses
31. Implement a function to batch multiple function calls
32. Implement a function to debounce a function (`debounce`)
33. Implement a function to throttle a function (`throttle`)
34. Implement a function to delay function execution (`delay`)
35. Implement a function that runs after `n` calls (`after(n)`) 

### **3. Prototypes & Object-Oriented JS**
36. Implement `bind` (Polyfill)
37. Implement `call` (Polyfill)
38. Implement `apply` (Polyfill)
39. Implement `Object.keys` (Polyfill)
40. Implement `Object.values` (Polyfill)
41. Implement `Object.entries` (Polyfill)
42. Implement `Object.assign` (Polyfill)
43. Implement `Object.create` (Polyfill)
44. Implement `new` (Polyfill)
45. Implement `instanceof` (Polyfill)
46. Implement deep cloning of an object
47. Implement deep comparison of two objects
48. Implement a class-based Singleton pattern
49. Implement a class-based Observer pattern
50. Implement a class-based Factory pattern
51. Implement a class-based Mixin pattern
52. Implement a custom event bus

### **4. Event Handling & DOM Utilities**
53. Implement `addEventListener` (Polyfill)
54. Implement `removeEventListener` (Polyfill)
55. Implement an `EventEmitter` (`on`, `emit`, `off`, `once`)
56. Implement event delegation
57. Implement a function to detect if an element is in the viewport
58. Implement a function to detect scroll direction
59. Implement a function to lazy-load images
60. Implement a function to smoothly scroll to an element
61. Implement a function to handle long-press events
62. Implement a function to manage global event listeners efficiently

---

## 📌 **Priority 2: Frequently Asked But Less Crucial**
### **5. Closures & Scope**
63. Implement a counter using closures
64. Implement a private variable using closures
65. Explain how JavaScript hoisting works
66. Explain the difference between `var`, `let`, and `const`
67. Implement a function that executes only once (`once`)
68. Implement a function that remembers previous function calls (`memoize`)
69. Implement a function that creates a private state using closures

### **6. String & Number Utilities**
70. Implement a function to reverse a string
71. Implement a function to check if two strings are anagrams
72. Implement a function to count occurrences of characters in a string
73. Implement a function to convert a string to camelCase
74. Implement a function to convert a string to snake_case
75. Implement a function to truncate a string
76. Implement a function to generate a random string of given length
77. Implement a function to check if a number is prime

### **7. Web APIs & Browser Utilities**
78. Implement a function to copy text to clipboard
79. Implement a function that detects the user's browser and OS
80. Implement a function that gets the user's geolocation
81. Implement a localStorage polyfill
82. Implement a sessionStorage polyfill
83. Implement a cookie management utility (`setCookie`, `getCookie`, `deleteCookie`)
84. Implement a function to sync state across browser tabs
85. Implement a function to detect if a tab is active or inactive
86. Implement a function to detect network status (`online` or `offline`)

---

## 📌 **Priority 3: Less Common But Good to Know**
87. Implement an LRU cache (Least Recently Used Cache)
88. Implement an LFU cache (Least Frequently Used Cache)
89. Implement a function that prefetches data for performance optimization
90. Implement a function to detect memory leaks in JavaScript
91. Implement a Proxy to validate object properties
92. Implement a Proxy to log all property accesses
93. Implement a Proxy to create read-only objects
94. Implement a Proxy that auto-fills missing properties with default values
95. Implement a function to shuffle an array (Fisher-Yates algorithm)
96. Implement a function to generate a UUID (Universally Unique Identifier)
97. Implement a function that converts a callback-based function into a Promise (`promisify`)
98. Implement a function to detect inactive users on a webpage
99. Implement a function that checks browser feature support dynamically
100. Implement a simple polyfill for `requestAnimationFrame`

