import { add } from './math.js';

console.log(add(2, 3));
const result = add(5, 10);
const root = document.getElementById('root');
root?.textContent = `The result of add(5, 10) is: ${result}`;