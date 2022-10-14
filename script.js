// dependency 
import inquirer from 'inquirer'
import chalk from 'chalk';
// employee queries based on role
// return employee query object based on role
import { createEmployees } from './src/inquirer-modules.js'
import { manager, intern, engineer } from './src/employee-module.js'


//func to generate html after data collection is finished
import { createPage } from './src/create-team.js'

//question objects for role selection and confirmation

const chooseRole =
{
    type: 'list',
    name: 'newrole',
    message: 'What\'s the role of your next team member?',
    choices: ['Intern', 'Engineer'],
}

const confirmTeam =
{
    type: 'list',
    name: 'finished',
    message: 'Would you like to generate another employee, or finish building your team?',
    choices: ['Add Employee', 'Finish Team'],
}

//passes object array and desired filename to module with fs
let creatingPage = async (checkedName) => {

    console.log('Creating your team\'s page....');
    console.log(chalk.gray('=========================='))

    await createPage(checkedName, teamArray).then(() => {
        console.log(chalk.bgGreen(`Success! Page location: ./created/${checkedName}-team.html`));
        console.log(chalk.gray('=========================='))
    })
}

//init array to store team members
const teamArray = [];

const callStack = async function (role) {

    if (!role) {
        console.log(chalk.gray('=========================='))
        // selects role of next team member -
        // prompts user, returns only needed value from answer object
        role = await inquirer.prompt(chooseRole)
            .then((selection) => { return selection.newrole })
    }
    // returns queries based on role passed
    let queries = createEmployees(role)

    // call starts with role passed as manager
    if (role === 'Manager') {
        console.log(chalk.italic('Creating a Manager...'))
        console.log(chalk.gray('=========================='))
        await manager(queries).then(async (generated) => {
            teamArray.push(generated)

            console.log(chalk.gray('=========================='))
            console.log('Here\'s your current team:')
            console.table(teamArray)
            console.log(chalk.gray('=========================='))

            await callStack()
        })
    }

    // create employee based on role passed in

    if (role === 'Intern') {
        console.log(chalk.italic('Creating a new Intern...'))
        console.log(chalk.gray('=========================='))
        await intern(queries).then((generated) => {
            teamArray.push(generated)
        })
    }

    if (role === 'Engineer') {
        console.log(chalk.italic('Creating a new Engineer...'))
        console.log(chalk.gray('=========================='))
        await engineer(queries).then((generated) => {
            teamArray.push(generated)
        })
    }

    console.log(chalk.gray('=========================='))
    console.log('Here\'s your current team:')
    console.table(teamArray)
    console.log(chalk.gray('=========================='))
    console.log(chalk.yellow('Checking process status...'))
    console.log(chalk.gray('=========================='))

    // checking if user wants to add another member,
    // or finish process and generate team
    await inquirer.prompt(confirmTeam).then(async (answer) => {

        if (answer.finished === 'Finish Team') {

            let fileName = (teamArray[0].name).replaceAll(' ', '')
            await creatingPage(fileName)
            console.log(chalk.blue('Exiting process...Bye!'))
            return process.exit(0)

        } else {
            console.log(chalk.gray('=========================='))
            return callStack()
        }
    })
};


// begin stack
callStack('Manager')
