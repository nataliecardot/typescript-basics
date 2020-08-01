// Prevents error messages. Treats this file a module with its own scope (otherwise declarations/variables in compiled JS file are treated as part of same scope and get 'redeclaration not allowed' errors) https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
// export {};

// Using type casting (otherwise cannot use num1Element.value; not every HTML element has a value property, so have to inform TS that what we get access to here is an input)
const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
// type is inferred by TypeScript (it knows it's a button since query select by button tag, so when entering buttonElement, addEventListener comes up as a method. It knows that when selecting button with querySelector, we get an HTMLButtonElement, the inferred type, one of the many built-in types supported by TS)
// Exclamation mark means expression in front of it could be null, but know it isn't. Makes TS take HTMLButtonElement as only value (and not null)
const buttonElement = document.querySelector('button')!;

// To compile to JavaScript, run tsc (having globally installed TypeScript on computer with npm i -g typescript). Compiles all TS files, while taking the tsconfig.json file into account (which enables strict mode). If targeting a specific file, e.g., tsc app.js, config file is ignored. However, IDE always picks up config file (errors shown in TS file)
function add(num1: number | string, num2: number | string) {
  // "type guard": running different code based on types we get for values
  // JS typeof operator provides types as strings
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    return num1 + num2;
  } else if (typeof num1 === 'string' && typeof num2 === 'string') {
    return num1 + ' ' + num2;
  }
  // Mixed (number and string) types
  return +num1 + +num2;
}

function printResult(resultObj: { val: number; timestamp: Date }) {
  console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  // value property always has a return type of string, so using unary plus to convert to number
  const result = add(+num1, +num2);
  const stringResult = add(num1, num2);
  console.log(result);
  console.log(stringResult);
  printResult({ val: result as number, timestamp: new Date() });
});
