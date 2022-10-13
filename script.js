
// node modules 

import inquirer from 'inquirer'


//func to generate html after data collection is finished
import { createPage } from './src/create-team.js'
import { createEmployees } from './src/inquirer-modules.js'

//class constructors
import { Manager } from './lib/Manager.js'
import { Engineer } from './lib/Engineer.js'
import { Intern } from './lib/Intern.js'

const chooseRole =
{
    type: 'list',
    name: 'emprole',
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



//calls html generation, and returns it to fs
let creatingPage = (checkedName) => {

    console.log('Creating your team\'s page....');
    console.log('==========================')

    createPage(checkedName, teamArray)
    setTimeout(() => {
        return
    }, 30);
}

const teamArray = [];

const callStack = async function (role) {

    // check if user chose to generate html,
    // passes team member array to generation if true


    let roleHandler = () => {

        return inquirer.prompt(chooseRole)

    }

    // question array for employee details
    let employeeQuery = createEmployees(role)

    let manager = async () => {
        let answers = await inquirer.prompt(employeeQuery)
        let { name, id, email, office } = answers
        teamArray.push(new Manager(name, id, email, office))
        return Promise.resolve()
    }

    let intern = async () => {
        let answers = await inquirer.prompt(employeeQuery)
        let { name, id, email, school } = answers
        teamArray.push(new Intern(name, id, email, school))
        return Promise.resolve()
    }

    let engineer = async () => {
        let answers = await inquirer.prompt(employeeQuery)
        let { name, id, email, github } = answers
        teamArray.push(new Engineer(name, id, email, github))
        return Promise.resolve()
    }

    // if the array is empty, make a manager
    if (role === 'Manager') {
        console.log('Creating a Manager...')
        console.log('==========================')

        await manager().then(async () => {

            let query = await roleHandler()
            await callStack(query.emprole)

        }
        )

    } else {
        console.log('==========================')
        console.log('Restarting stack...')
        console.log('==========================')
    }

    // else make employee based on role passed in from selection

    if (role === 'Intern') {

        console.log('Creating a new Intern...')
        console.log('==========================')

        await intern()

    } else if (role === 'Engineer') {

        console.log('Creating a new Engineer...')
        console.log('==========================')

        await engineer()

    }

    // queries if user wants to continue creating employees
    // if true, generates and exits chain
    // if false, continues chain to query next employee's role
    // then passes that on recursion of callstack

    console.table(teamArray)

    console.log('Checking team status...')

    await inquirer.prompt(confirmTeam).then((answer) => {

        if (answer.finished === 'Finish Team') {

            let fileName = (teamArray[0].name).replaceAll(' ', '')


            console.log(`Success! Page location: ./created/${fileName}-team.html`);
            console.log('==========================')

            creatingPage(fileName)

            return process.exit(0)

        }
    })

    //if user elects to finish building team and gen page


    console.log('Awaiting role selection...')
    console.log('==========================')

    let query = await roleHandler()

    setTimeout(() => {
        callStack(query.emprole)
    }, 1000);


};


// begin stack
callStack('Manager')
