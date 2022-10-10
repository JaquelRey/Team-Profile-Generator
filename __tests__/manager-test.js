// get manager constructor
import {Manager} from '../lib/manager.js'
// create manager object

test('creates a new manager object', () => {
    const manager = new Manager('Bryan', 420, 'notgunna@lie.com', 69);

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.office).toEqual(expect.any(Number));
});


// test getOffice()

// already included in object test since it's just a number value


// test getRole()

test('gets manager role', () => {
    const manager = new Manager('Bryan', 420, 'notgunna@lie.com', 69 );

    expect(manager.getRole()).toEqual("Manager");
});