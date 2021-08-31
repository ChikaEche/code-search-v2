export const generateRandomString = () => {
  let randomString = ''
  for (let i = 0; i < 8; i++) {
    const randomNumber = Math.floor(Math.random() * (122 - 97 + 1) + 97);
    randomString = `${randomString}${String.fromCharCode(randomNumber)}`
  }

  return randomString;
}