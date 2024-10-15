exports.getRandomDarkColor = () => {
  // Generate random values for R, G, and B, ensuring they are closer to 0
  const r = Math.floor(Math.random() * 128); // 0-127
  const g = Math.floor(Math.random() * 128); // 0-127
  const b = Math.floor(Math.random() * 128); // 0-127

  // Convert to hexadecimal and pad with zeroes if necessary
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  // Form the color code
  const color = `#${rHex}${gHex}${bHex}`;

  return color;
};

exports.getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 128) + 128; // 128-255
  const g = Math.floor(Math.random() * 128) + 128; // 128-255
  const b = Math.floor(Math.random() * 128) + 128; // 128-255

  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  const color = `#${rHex}${gHex}${bHex}`;

  return color;
};
