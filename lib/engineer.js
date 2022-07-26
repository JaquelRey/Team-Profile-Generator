// constructor

const Employee = require('./Employee');
class Engineer extends Employee {
    constructor (name, id, email, github) {
        super (name, id, email); 
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    // getID () {
    //     return this.id;
    // }

    // getEmail() {
    //     return this.email;
    // }

    getRole() {
        return "Engineer";
    }

};

module.exports = Engineer; 