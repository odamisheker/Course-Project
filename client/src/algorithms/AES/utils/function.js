export function getUint32(octets, index) {
  return (
    ((octets[index] & 0xff) << 24) +
    ((octets[index + 1] & 0xff) << 16) +
    ((octets[index + 2] & 0xff) << 8) +
    (octets[index + 3] & 0xff)
  );
}

export function convertToInt32(bytes) {
    let result = [];
    for (let i = 0; i < bytes.length; i += 4) {
        result.push(getUint32(bytes, i));
    }
    return result;
}