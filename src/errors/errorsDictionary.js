export const errorDictionary = {

    USER_ALREADY_EXISTS: {
        name: 'User already exists',
        message: 'The user email is already registered',
        code: 400
    },

    INVALID_USER_DATA: {
        name: 'Invalid user data',
        message: 'Missing required user fields',
        code: 400
    },

    PET_CREATION_ERROR: {
        name: 'Pet creation error',
        message: 'Error creating pet',
        code: 500
    },

    PET_NOT_FOUND: {
        name: 'Pet not found',
        message: 'Pet does not exist',
        code: 404
    },

    DATABASE_ERROR: {
        name: 'Database error',
        message: 'Error connecting to database',
        code: 500
    }

};