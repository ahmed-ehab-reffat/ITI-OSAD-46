const { buildConfig } = require('./config');

describe('buildConfig', () => {
    it('should return the correct config', () => {
        // setup
        const userPrefs = {
            theme: 'dark',
            language: 'fr',
            notifications: { email: false, sms: true },
        };
        const expectedResult = {
            theme: 'dark',
            language: 'fr',
            notifications: { email: false, sms: true },
        };
        // exercise
        const result = buildConfig(userPrefs);
        // verify
        expect(result).toEqual(expectedResult);
    })
    it('should return the default config if the user prefs is not provided', () => {
        // setup
        const expectedResult = {
            theme: 'light',
            language: 'en',
            notifications: { email: true, sms: false },
        };
        // exercise
        const result = buildConfig();
        // verify
        expect(result).toEqual(expectedResult);
    })
    it('sould not return any extra fields', () => {
        // setup
        const userPrefs = {
            theme: 'dark',
            language: 'fr',
            custom: 'custom',
        };
        const expectedResult = {
            theme: 'dark',
            language: 'fr',
            notifications: { email: true, sms: false },
        };
        // exercise
        const result = buildConfig(userPrefs);
        // verify
        expect(result).toEqual(expectedResult);
    })
})