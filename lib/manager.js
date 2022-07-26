// constructor

const Employee = require('./Employee');
class Manager extends Employee {
    constructor (name, id, email, office) {
        super (name, id, email); 
        this.office = office;
    }

    getOffice() {
        return this.office;
    }

    // getID () {
    //     return this.id;
    // }

    // getEmail() {
    //     return this.email;
    // }

    getRole() {
        return "Manager";
    }

};

module.exports = Manager; 