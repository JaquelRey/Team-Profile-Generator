

//function to create employees (manager on first call)
export const createEmployees = (role) => {

    //changing the name message on a prompt conditionally 
    //('when:' would make 3 prompts where I just need one)
    let type = role

    let nameMsgs = 'Who\'s the project manager?'
    let pNutGal = 'You can\'t manage yourself.... Try again!'

    if (type === 'Intern') {
        nameMsgs = 'Who\'s the new intern?'
        pNutGal = 'I know they\'re an intern, but you still need to give them a name! Try again.'
    } else if (type === 'Engineer') {
        nameMsgs = 'Who\'s the new engineer?'
        pNutGal = 'Code isn\'t going to write itself, name your engineer! Try again.'
    }

    let questions =  [
        {
            type: 'input',
            name: 'name',
            message: nameMsgs,
            //answer must be at least one letter, 
            //and can include non consecutive hypens and spaces
            validate: function (answer) {
                let valid = /^[a-zA-Z]+(-?[a-zA-Z]+|\s?[a-zA-Z]+)((-?|\s?){0,1}[a-zA-Z]+$)|(-?|\s?){0,1}[a-zA-Z]+$/g.test(answer)
                if (answer.length < 1 || answer === ' ' || answer === '-') {

                    console.log(pNutGal);
                    return false

                } else if (valid != true) {

                    console.log('A name can only include letters, non-consecutive hyphens, and single spaces.')
                    return false
                } else {
                return true
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What\'s this employee\'s ID number?',
            //answer must be number
            validate: function (answer) {
                if (isNaN(answer) === true) {
                    
                    console.log('Employee ID has to be a number.');
                    return false
                } else {
                    return true
                }
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

                    console.log('Not a valid email address format, please re-enter employee\'s email.');
                    return false

                } else {
                return true
                }
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
                    
                    console.log('Office number must be a number with no decimal values.');
                    return false
                } else {
                return true
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school does this intern attend?',
            when: (role === 'Intern'),
            //same validation as name
            validate: function (answer) {
                let valid = /^[a-zA-Z]+(-?[a-zA-Z]+|\s?[a-zA-Z]+)((-?|\s?){0,1}[a-zA-Z]+$)|(-?|\s?){0,1}[a-zA-Z]+$/g.test(answer)
                if (answer.length < 1 || answer === ' ' || answer === '-') {

                    console.log('Intern needs to have a school! Try again.');
                    return false

                } else if (valid != true) {

                    console.log('School name must only include letters, non-consecutive hyphens, and single spaces.');
                    return false

                } else {
                return true
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What\'s this engineer\'s github username?',
            when: (role === 'Engineer'),
            validate: function (answer) {
                /*Github username may only contain alphanumeric characters or hyphens, cannot begin or end with a hyphen.
                Maximum is 39 characters. This regex: 
                begins with any letter a-z, or any digit
                (followed by any number of letters a-z, or any digit
                OR can optionally have a single case of a hypen,
                (followed by any number of letters a-z, or any digit))
                the length must be at least 1 but not more than 39*/
                let valid = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(answer)
                if (valid === false) {

                    console.log('Not a valid username format, please re-enter employee\'s Github.');
                    return false
                } else {
                return true
                }
            }
        }
    ]

    return questions
}
