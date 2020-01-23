const { cli } = require('cli-ux');
const chalk = require('chalk');

module.exports = async (prompt, validResponsesArray, that) => {
  const response = await getRequiredValue(prompt, validResponsesArray, that);
  return response;
}

const getRequiredValue = async (prompt, validResponsesArray, that) => {
  const response = await displayPrompt(chalk.bold(chalk.cyanBright(prompt)));
  
  for (var i = 0; i < validResponsesArray.length; i += 1) {
    if (response.toLowerCase() == validResponsesArray[i]) {
      return response;
    }
  }

  that.log('Please enter a valid response');
  await getRequiredValue(prompt, validResponsesArray, that);
}

const displayPrompt = async (promptText) => {
  const response = await cli.prompt(promptText);
  return response;
}