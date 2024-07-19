const letterCases = [
  'lowercase',
  'UPPERCASE',
  'camelCase',
  'PascalCase',
  'none'
];
const delimiterCases = [
  'none',
  'kebab-case',
  'snake_case'
]

const wordPattern = /(?:^\w|[A-Z]|\b\w)/g
const delimiterWordPattern = /\w+/g
const spacesPattern = /\s+/g

const convertLettercase = (input: string, lettercase: string, delimitercase: string) : string => {
  if (input) {
    let output = input;

    const letterIndex = letterCases.indexOf(lettercase);
    switch(letterIndex) {
      case 0:
        output = input.toLowerCase();
        break;
      case 1:
        output = input.toUpperCase();
        break;
      case 2:
        output = input.replace(wordPattern, (word, index) => {
                                return index === 0 ? word.toLowerCase() : word.toUpperCase();
                              }).replace(spacesPattern, '');
        break;
      case 3:
        output = input.replace(wordPattern, (word, index) => {
                                return word.toUpperCase();
                              }).replace(spacesPattern, '');
        break;
      default:
        break;
    }

    const delimiterIndex = delimiterCases.indexOf(delimitercase);
    switch(delimiterIndex) {
      case 1:
        output = output.replace(delimiterWordPattern, (word, index) => {
                                return index === 0 ? word : ` ${word}`;
                              }).replace(spacesPattern, '-');
        break;
      case 2:
        output = output.replace(delimiterWordPattern, (word, index) => {
                                return index === 0 ? word : ` ${word}`;
                              }).replace(spacesPattern, '_');
        break;
      default:
        break;
    }
    
    return output;
  }
  return input;
}

export { letterCases, delimiterCases, convertLettercase }