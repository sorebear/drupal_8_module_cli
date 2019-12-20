module.exports = (optionsObj) => {
  let displayText = '';

  for (let i = 1; i <= Object.keys(optionsObj).length; i+= 1) {
    displayText += `${i.toString()}. ${optionsObj[i]}\n`;
  }

  return displayText;
}