module.exports = (inputtedName) => {
  const nameArr = inputtedName.split(/_|-|\ /);
  return nameArr.map((word) => {
    const wordArr = word.split('');
    wordArr[0] = wordArr[0].toUpperCase();
    return wordArr.join('');
  }).join(' ');
}