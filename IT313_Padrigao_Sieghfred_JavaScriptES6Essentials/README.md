# IT313 Laboratory 2: JavaScript ES6+ Essentials

## Problem
This program creates an enrollment eligibility report for IT313 enrollees. It calculates each student's average, labels the student as PASSING or PROBATION, and displays the class average and passing count.

## Files
- `gradeUtils.js` exports `computeAverage()` as a named export and `isPassing()` as a default export.
- `index.js` simulates retrieving enrollee records, processes the grades, and prints the report.
- `package.json` enables ES module syntax in Node.js.

## ES6+ Features Used
- `const` and `let`
- Arrow functions
- Template literals
- Object destructuring
- Spread operator (`...grades`) passes the three grades as separate arguments; rest parameter (`...lines`) collects arguments for the report-printing function.
- `map()`, `filter()`, and `reduce()`
- Named and default ES module exports/imports
- Promises and `async`/`await`
- `try`/`catch` for error handling

## Requirements
Install Node.js, then open a terminal in this folder.

Run the program:
```bash
node index.js
```

The report should show each enrollee's average and status, the class average, and the passing count.

## Demonstrating Error Handling
In `index.js`, temporarily replace `resolve(enrollees);` with:
```javascript
reject(new Error("Registrar API connection failed."));
```
Run `node index.js` to demonstrate the error message. Restore `resolve(enrollees);` afterward.
