export const convertToCharCode = (input: string): string => {
  let charCode = '';
  for(const char of input) {
    const code = char.charCodeAt(0);
    charCode = `${charCode}${code}`;
  }

  return charCode;
}