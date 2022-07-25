// get employee constructor
const Employee = Require('../lib/Employee');
// create employee object

test('creates a new employee object', () => {
    const employee = new Employee('Bryan', 420, 'notgunna@lie.com');

    expect(employee.name).toEqual(expect.any(String));
});

// test getName()

// test getId()

// test getEmail()

// test getRole()