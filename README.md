# terminal-colors

A npm package to add some styling to terminal output

**Does Not Work With JavaScript**
**Currently supports typescript**
**Working on a JavaScript Fix**

## Installation

```sh
npm install terminal-styling
```

## Usage

```typescript

import { console } from 'terminal-styling'

// Changes terminal output to red
console.err("This is my error message");

// Changes terminal output to yellow
console.warn("This is my warning message");

// Changes terminal output to green
console.info("This is my info message");

// Allows the user to use custom colors
console.customColor("ffffff", "White on black", "000000");
console.customColor("00ffff", "Cyan text");

// Allows the user to create a table
console.table([{ name: "Alice", age: 25 }, { name: 'Bob', age: 30 }]);

```