const str = prompt("Enter a string to check if it's a palindrome:");

const isCaseSensitive = confirm(
  "Do you want to consider case sensitivity?\n('Cancel' for NO and 'OK' for Yes)"
);

let processedStr = str;
if (!isCaseSensitive) {
  processedStr = str.toLowerCase();
}

const reversedStr = processedStr.split("").reverse().join("");

if (processedStr === reversedStr) {
  alert(`"${str}" is a palindrome!`);
} else {
  alert(`"${str}" is NOT a palindrome.`);
}
