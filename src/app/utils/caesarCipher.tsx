export const caesarCipher = (
  text: string,
  shift: number,
  encrypt: boolean = true
): string => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const adjustShift = encrypt ? shift : -shift;

  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const index = alphabet.indexOf(char);
      if (index === -1) return char; // Keep non-alphabet characters
      const newIndex = (index + adjustShift + 26) % 26;
      return alphabet[newIndex];
    })
    .join("");
};
