// get engineer constructor
import {Engineer} from './engineer.js'
// create engineer object

test('creates a new engineer object', () => {
    const engineer = new Engineer('Bryan', 420, 'notgunna@lie.com', 'bryguy15');

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.github).toEqual(expect.any(String));
});


// test getGithub()

test('gets engineer github', () => {
    const engineer = new Engineer('Bryan', 420, 'notgunna@lie.com', 'bryguy15');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

// test getRole()

test('gets engineer role', () => {
    const engineer = new Engineer('Bryan', 420, 'notgunna@lie.com', 'bryguy15');

    expect(engineer.getRole()).toEqual("Engineer");
});