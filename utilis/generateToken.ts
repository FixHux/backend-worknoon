import crypto from "crypto"

export const generateRandomString = (length: number, useNumChars: boolean = true) => {
    const numCharacters = '0123456789';
    const allCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, useNumChars ? numCharacters.length : allCharacters.length);
      randomString += useNumChars ? numCharacters.charAt(randomIndex) : allCharacters.charAt(randomIndex);
    }
  
    return randomString;
  }

