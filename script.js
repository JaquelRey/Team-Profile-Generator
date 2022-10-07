
// node modules 
const fs = require('fs');
const inquirer = require('inquirer');
const createTeam = require('./src/create-team.js');

//func to generate html after data collection is finished
const createHTML = require('./src/create-team.js')


//class constructors
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// empty array for storing entire team
const teamArray = [];

//function to create employees (manager on first call)
async function createEmployees(role) {

    //changing the name message on a prompt conditionally 
    //("when:" would make 3 prompts where I just need one)

    let nameMsgs = 'Who\'s the project manager?'
    let pNutGal = "You can't manage yourself.... Try again!"

    if (role === "Intern") {
        nameMsgs = 'Who\'s the new intern?'
        pNutGal = "I know they\'re an intern, but you still need to give them a name! Try again."
    } else if (role === "Engineer") {
        nameMsgs = 'Who\'s the new engineer?'
        pNutGal = "Code isn't going to write itself, name your engineer! Try again."
    }


    let answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: nameMsgs,
            //answer must be at least one letter, 
            //and can include non consecutive hypens and spaces
            validate: function (answer) {
                let valid = /^\p{L}+(?:[- ]\p{L}+)*$/.test(answer)
                if (answer.length < 1 || answer === " " || answer === "-") {

                    return console.log(pNutGal);

                } else if (valid != true) {

                    return console.log("A name can only include letters, non-consecutive hyphens, and single spaces.")
                
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What\'s this employee\'s ID number?',
            //answer must be number
            validate: function (answer) {
                if (isNaN(answer) === true) {

                    return console.log("Employee ID has to be a number.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What\'s this employee\'s email address?',
            //answer must be valid email format
            validate: function (email) {
                let valid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                if (valid != true) {

                    return console.log("Not a valid email address format, please re-enter employee\'s email.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'office',
            message: 'What\'s the manager\'s office number?',
            when: (role === 'Manager'),
            //answer must be a number
            validate: function (answer) {
                if (Number.isInteger(answer) === true) {
                    
                    return console.log("Office number must be a number with no decimal values.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school does this intern attend?',
            when: (role === 'Intern'),
            //same validation as name
            validate: function (answer) {
                let valid = /^\p{L}+(?:[- ]\p{L}+)*$/.test(answer)
                if (answer.length < 1 || answer === " " || answer === "-") {

                    return console.log("Intern needs to have a school! Try again.");

                } else if (valid != true) {

                    return console.log("School name must only include letters, non-consecutive hyphens, and single spaces.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What\'s this engineer\'s github username?',
            when: (role === 'Engineer'),
            validate: function (github) {
                /*Github username may only contain alphanumeric characters or hyphens, cannot begin or end with a hyphen.
                Maximum is 39 characters. This regex: 
                begins with any letter a-z, or any digit
                (followed by any number of letters a-z, or any digit
                OR can optionally have a single case of a hypen,
                (followed by any number of letters a-z, or any digit))
                the length must be at least 1 but not more than 39*/
                let valid = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/.test(github)
                if (valid != true) {

                    return console.log("Not a valid email address format, please re-enter employee\'s Github.");
                
                }
                return true
            }
        },
    ])


    let { name, id, email, office, school, github } = answers

    let emp

    if (role === "Intern") {
        emp = new Intern(name, id, email, school)
    } else if (role === "Engineer") {
        emp = new Engineer(name, id, email, github)
    } else {
        emp = new Manager(name, id, email, office)
    }

    teamArray.push(emp)
};



//checks if user wants to exit prompting and generate team with current array
async function confirmTeam() {

    console.log("Here's your current team:")
    console.table(teamArray)
    console.log("==========================")

    //query user

    let confirm = await inquirer.prompt([
        {
            type: 'list',
            name: 'finished',
            message: 'Would you like to generate another employee, or finish building your team?',
            choices: ['Add Employee', 'Finish Team'],
        }
    ])

    //conditional to either generate page or prompt for next employee role

    if (confirm.finished === 'Finish Team') {
        creatingPage()
    } else {
        chooseRole()
    }


}

//calls html generation, and returns it to fs
async function creatingPage() {
    let teamed = await createTeam.createHTML(teamArray);
    //making the manager's name part of the file name, removing spaces in the case of "Firstname Lastname"
    //I should also check for characters that aren't allowed as filenames...
    let checkedName = (teamArray[0].name).replaceAll(' ', '')
    //path / filename to use in fs call
    let pathAndName = (`./created/${checkedName}-team.html`)
    console.log("Creating your team's page....");
    console.log("==========================")

    return fs.writeFile(pathAndName, teamed, (error) => {
        if (error) throw error;
        console.log("Success! Team page created and stored in the \"created\" folder!")
    });
}



async function generateTeam() {
    // let { name, id, email, office, school, github } = await createEmployees();

    const manager = await createEmployees("Manager")
    const intern = await createEmployees("Intern");
    const engineer = await createEmployees("Engineer");
    //checks role of second employee
    let comf = await confirmTeam("Manager")



    //make manager, push to array
    //make 2nd employee (intern or manager)
    //confirm to add members or generate html
    //else recurse



    // console.table(teamArray)
    do {
        if (comf[0] === "Intern") {

            await confirmTeam()
        }
        if (comf[0] === "Engineer") {

            await confirmTeam()
        }
    } while (comf[1] != "Finished Team")

}

// begin stack

generateTeam()