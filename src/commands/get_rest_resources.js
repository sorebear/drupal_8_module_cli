const { cli } = require('cli-ux');
const chalk = require('chalk');

const getRequiredValue = require('../functions/get_required_value');
const getDisplayName = require('../functions/get_display_name');
const createNumOptions = require('../functions/create_numeric_options');
const displayOptions = require('../functions/display_options');

module.exports = async (app) => {
  let continueAddingResources = true;
  const restResources = [];
  const getFunctionsMap = {
    1: 'GET all',
    2: 'GET single($id)',
    3: chalk.redBright('No GET request'),
  };

  const postFunctionsMap = {
    1: 'POST add($data)',
    2: 'POST delete($data)',
    3: 'POST update($data)',
    4: chalk.redBright('No POST request'),
  };

  let index = 1;

  while (continueAddingResources) {
    app.log(chalk.bold(chalk.cyanBright(chalk.underline(`\nRest Resource #${index}:`))));
    const getFunctionNum = await getRequiredValue(`GET request?\n${displayOptions(getFunctionsMap)}`, createNumOptions(getFunctionsMap), app);
    const postFunctionNum = await getRequiredValue(`POST request?\n${displayOptions(postFunctionsMap)}`, createNumOptions(postFunctionsMap), app);
    const inputtedName = await cli.prompt(chalk.bold(chalk.cyanBright('Resource Name?')));

    const resourceDisplayName = getDisplayName(inputtedName);
    const resourceMachineName = resourceDisplayName.toLowerCase().split(/\-|\ /).join('_');
    const resourceClassPrefix = resourceDisplayName.split(' ').join('');

    const getFunction = getFunctionNum === '3' ? null : getFunctionsMap[getFunctionNum];
    const postFunction = postFunctionNum === '4' ? null : postFunctionsMap[postFunctionNum];
    
    restResources.push({
      resourceMachineName,
      resourceDisplayName,
      resourceClassPrefix,
      getFunction,
      postFunction
    });

    const addAnotherResource = await getRequiredValue('\nAdd Another Field? (y/n)', ['y', 'n'], app);

    if (addAnotherResource === 'n') {
      continueAddingResources = false;
    }

    index += 1;
  }

  return restResources;
}