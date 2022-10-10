// get intern constructor
import {Intern} from '../lib/intern.js'
// create intern object

test('creates a new intern object', () => {
    const intern = new Intern('Bryan', 420, 'notgunna@lie.com', 'uConn');

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
});


// test getSchool()

test('gets intern school', () => {
    const intern = new Intern('Bryan', 420, 'notgunna@lie.com', 'uConn');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

// test getRole()

test('gets intern role', () => {
    const intern = new Intern('Bryan', 420, 'notgunna@lie.com', 'uConn');

    expect(intern.getRole()).toEqual("Intern");
});