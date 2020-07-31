// Prevents error messages. Treats this file a module with its own scope (otherwise declarations/variables in compiled JS file are treated as part of same scope and get 'redeclaration not allowed' errors) https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

// Using type casting (otherwise cannot use num1Element.value; not every HTML element has a value property, so have to inform TS that what we get access to here is an input)
const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
// type is inferred by TypeScript (it knows it's a button since query select by button tag, so when entering buttonElement, addEventListener comes up as a method. It knows that when selecting button with querySelector, we get an HTMLButtonElement, the inferred type, one of the many built-in types supported by TS)
const buttonElement = document.querySelector('button');

// To compile to JavaScript, run tsc (having globally installed TypeScript on computer with npm i -g typescript). Compiles all TS files, while taking the tsconfig.json file into account (which enables strict mode). If targeting a specific file, e.g., tsc app.js, config file is ignored. However, IDE always picks up config file (errors shown in TS file)
function add(num1: number, num2: number) {
  return num1 + num2;
}

if (buttonElement) {
  buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    // value property always has a return type of string, so using unary plus to convert to number
    const result = add(+num1, +num2);
    console.log(result);
  });
}
