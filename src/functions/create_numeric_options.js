module.exports = (optionsObj) => {
  let optionArr = [];

  for (let i = 1; i <= Object.keys(optionsObj).length; i+= 1) {
    optionArr.push(i);
  }

  return optionArr;
}