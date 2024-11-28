// Script-level (traditional):
/*
<script>
   var scriptVar = 'visible everywhere';
   let scriptLet = 'block scoped';
   
   // Added to global scope
   console.log(window.scriptVar);  // 'visible everywhere'
   console.log(window.scriptLet);  // undefined
</script>

// Module-level:
<script type="module">
   var moduleVar = 'module scoped';
   let moduleLet = 'module scoped';
   
   // Not added to global scope
   console.log(window.moduleVar);  // undefined
   console.log(window.moduleLet);  // undefined
   
   // Modules have their own scope
   export const exportedVar = 'can be imported';
   
   // Imports are scoped to module
   import { something } from './other.js';
</script>

// Key Differences:
1. Module Scope:
  - Own scope, not global
  - Strict mode by default
  - Variables not attached to window
  
2. Import/Export:
  - Can import/export variables
  - Explicit dependencies
  - Better encapsulation

3. Loading:
  - Modules load asynchronously
  - Scripts load synchronously
  - Modules execute after load

4. Accessibility:
  - Module variables: private unless exported
  - Script variables: global by default

  */