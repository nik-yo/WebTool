const generateString = (length: number, options: string[]) : string => {
  if (length > 0) {
    let chars = '';
    for (let option of options) {
      switch(option) {
        case "uppercase":
          chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          break;
        case "lowercase":
          chars += 'abcdefghijklmnopqrstuvwxyz';
          break;
        case "digit":
          chars += '0123456789';
          break;
        case "special":
          chars += "!\"#$ %&'()*+,-./:;<=>?@[\]^_`{|}~";
          break;
        case "space":
          chars += ' ';
          break;
        default:
          break;
      }
    }

    if (chars.length > 0) {
      let result = [];

      let arr = new Uint8Array(length);
      window.crypto.getRandomValues(arr);
      for (let i = 0; i < arr.length; i += 1) {
          let charIndex = Math.floor(arr[i] / 256 * chars.length);
          result.push(chars.charAt(charIndex));
      }

      return result.join('');
    }
  }
  return '';
}

const generateStringOptions = [
  {
    text: 'Uppercase (A-Z)',
    value: 'uppercase'
  },
  {
    text: 'Lowercase (a-z)',
    value: 'lowercase'
  },  
  {
    text: 'Digit (0-9)',
    value: 'digit'
  },
  {
    text: 'Special characters',
    value: 'special'
  },
  {
    text: 'Space',
    value: 'space'
  }
]

export { generateString, generateStringOptions }