"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Using type casting (otherwise cannot use num1Element.value; not every HTML element has a value property, so have to inform TS that what we get access to here is an input)
var num1Element = document.getElementById('num1');
var num2Element = document.getElementById('num2');
// type is inferred by TypeScript (it knows it's a button since query select by button tag, so when entering buttonElement, addEventListener comes up as a method. It knows that when selecting button with querySelector, we get an HTMLButtonElement, the inferred type, one of the many built-in types supported by TS)
var buttonElement = document.querySelector('button');
// To compile to JavaScript, run tsc (having globally installed TypeScript on computer with npm i -g typescript). Compiles all TS files, while taking the tsconfig.json file into account (which enables strict mode)
function add(num1, num2) {
    return num1 + num2;
}
if (buttonElement) {
    buttonElement.addEventListener('click', function () {
        var num1 = num1Element.value;
        var num2 = num2Element.value;
        // value property always has a return type of string, so using unary plus to convert to number
        var result = add(+num1, +num2);
        console.log(result);
    });
}
