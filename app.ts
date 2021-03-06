// Prevents error messages. Treats this file a module with its own scope (otherwise declarations/variables in compiled JS file are treated as part of same scope and get 'redeclaration not allowed' errors) https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
// export {};

// Using type casting (otherwise cannot use num1Element.value; not every HTML element has a value property, so have to inform TS that what we get access to here is an input)
const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
// type is inferred by TypeScript (it knows it's a button since query select by button tag, so when entering buttonElement, addEventListener comes up as a method. It knows that when selecting button with querySelector, we get an HTMLButtonElement, the inferred type, one of the many built-in types supported by TS)
// Exclamation mark means expression in front of it could be null, but know it isn't. Makes TS take HTMLButtonElement as only value (and not null)
const buttonElement = document.querySelector('button')!;

// generic type: a type that interacts with another type. Array is a great example; it's a type on its own, but it interacts with another type: the type inside the array
// By default, array type is any[]
const numResults: Array<number> = [];
const textResults: string[] = [];

// Note: If you have a class or constructor function, its name can be used as a name as well (as with Date)

// type alias (good for unions)
type NumOrString = number | string;
type Result = { val: number; timestamp: Date };

// interfaces allow you to define structure of an object (if just defining structure of object, can use either interface or type alias. Interfaces are more common for that purpose. However, interfaces can be used to force classes to implement certain methods and functionalities)
interface ResultObj {
  val: number;
  timestamp: Date;
}

// To compile to JavaScript, run tsc (having globally installed TypeScript on computer with npm i -g typescript). Compiles all TS files, while taking the tsconfig.json file into account (which enables strict mode). If targeting a specific file, e.g., tsc app.js, config file is ignored. However, IDE always picks up config file (errors shown in TS file)
function add(num1: NumOrString, num2: NumOrString) {
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

function printResult(resultObj: ResultObj) {
  console.log(resultObj.val);
}

buttonElement.addEventListener('click', () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  // value property always has a return type of string, so using unary plus to convert to number
  const result = add(+num1, +num2);
  numResults.push(result as number);
  const stringResult = add(num1, num2);
  textResults.push(stringResult as string);
  printResult({ val: result as number, timestamp: new Date() });
  console.log(numResults, textResults);
});

// A promise is an example of a generic type, because it resolves to a value, a value that is the generic type for the promise
// Note: had to set target to es6 in tsconfig.json (es5 by default) and enter tsc so config is taken into account in order to use promise, an ES6 feature
const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('It worked!');
  }, 1000);
});

myPromise.then((result) => {
  console.log(result.split('w'));
});
