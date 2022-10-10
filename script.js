
// node modules 
import * as fs from 'fs/promises'
import inquirer from 'inquirer'


//func to generate html after data collection is finished
import {createPage} from './src/create-team.js'
import {createEmployees} from './src/inquirer-modules.js'

//class constructors
import {Manager} from './lib/Manager.js'
import {Engineer} from './lib/Engineer.js'
import {Intern} from './lib/Intern.js'

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
let creatingPage = async () => {

    //making the manager's name part of the file name, 
    //removing spaces in the case of 'Firstname Lastname'
    let checkedName = (teamArray[0].name).replaceAll(' ', '')
    //path / filename to use in fs call
    let pathAndName = (`./created/${checkedName}-team.html`)
    
    console.log('Creating your team\'s page....');
    console.log('==========================')

    await createPage(teamArray)
    .then((result) => {
        fs.writeFile(pathAndName, result, (error) => {
            if (error) throw error;
            console.log('Success! Team page created and stored in the \"created\" folder!')
        });
    })

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
        console.log('Recursion successful!')
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
    console.log('==========================')

    await inquirer.prompt(confirmTeam)
        .then((answer) => {


            if (answer.finished === 'Finish Team') {
                creatingPage()
                throw new Error('All done here!')
            } else {
                console.log('Awaiting role selection...')
                console.log('==========================')
            }

        }).then(async () => {

            let query = await roleHandler()

            await callStack(query.emprole)

        })

};


// begin stack
callStack('Manager')
