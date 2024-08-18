export function hexToString(hex: string): string {
  // Remove the "0x" prefix if present
  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }

  let str = '';

  // Ensure that the hex string has an even length
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }

  for (let i = 0; i < hex.length; i += 2) {
    // Convert each hex pair to its character representation
    const hexPair = hex.substring(i, i + 2);
    const charCode = parseInt(hexPair, 16);
    str += String.fromCharCode(charCode);
  }

  return str;
}