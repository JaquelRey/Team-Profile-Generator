// get employee constructor
import {Employee} from './employee.js'
// create employee object

test('creates a new employee object', () => {
    const employee = new Employee('Bryan', 420, 'notgunna@lie.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

// test getName()

test('gets employee name', () => {
    const employee = new Employee('Bryan', 420, 'notgunna@lie.com');

    expect(employee.getName()).toEqual(expect.any(String));
});

// test getId()

test('gets employee id', () => {
    const employee = new Employee('Bryan', 420, 'notgunna@lie.com');

    expect(employee.getId()).toEqual(expect.any(Number));
});

// test getEmail()

test('gets employee email', () => {
    const employee = new Employee('Bryan', 420, 'notgunna@lie.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

// test getRole()

test('gets employee role', () => {
    const employee = new Employee('Bryan', 420, 'notgunna@lie.com');

    expect(employee.getRole()).toEqual("Employee");
});