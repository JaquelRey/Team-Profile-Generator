// constructor

const Employee = require('./Employee');
class Intern extends Employee {
    constructor (name, id, email, school) {
        super (name, id, email); 
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    // getID () {
    //     return this.id;
    // }

    // getEmail() {
    //     return this.email;
    // }

    getRole() {
        return "Intern";
    }

};

module.exports = Intern; 