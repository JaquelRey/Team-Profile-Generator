// dependency 
import inquirer from 'inquirer'

// employee class constructors
import { Manager } from '../lib/Manager.js'
import { Engineer } from '../lib/Engineer.js'
import { Intern } from '../lib/Intern.js'


export let manager = async (queries) => {

    let answers = await inquirer.prompt(queries)
    let { name, id, email, office } = answers

    return Promise.resolve(new Manager(name, id, email, office))
}

export let intern = async (queries) => {

    let answers = await inquirer.prompt(queries)
    let { name, id, email, school } = answers

    return Promise.resolve(new Intern(name, id, email, school))
}

export let engineer = async (queries) => {

    let answers = await inquirer.prompt(queries)
    let { name, id, email, github } = answers

    return Promise.resolve(new Engineer(name, id, email, github))
}