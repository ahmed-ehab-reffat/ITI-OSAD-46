const { formatUser } = require('./user');

const rawUser = {
    user_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email_address: 'John.doe@example.com',
    role: 'admin',
    phone_number: '1234567890',
    password: 'password',
};

describe('formatUser', () => {
    it('should return the correct user', () => {
        // setup
        const expectedResult = {
            id: 1,
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            isAdmin: true,
        };
        // exercise
        const result = formatUser(rawUser);
        // verify
        expect(result).toEqual(expectedResult);
        expect(result).toHaveProperty('id', 1);
        expect(result).not.toHaveProperty('password');
        expect(result).not.toHaveProperty('phone_number');

    })

})