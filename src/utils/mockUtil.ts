import { faker } from '@faker-js/faker';
import User from '../interfaces/user';
import Approver from '../interfaces/approver';

/**
 * Helper method for awaiting a preset number of time
 * @param ms Milliseconds to wait
 * @returns Promise that resolves after `ms` milliseconds
 */
export const wait = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

/**
 * Constant seed while the app is opened, so the faker results are consistent.
 */
const FakerSeed = Date.now();

/**
 * Generates a fake user object with faker.js
 * @returns Fake `User` object
 */
export const getFakeUser = (): User => {
    faker.seed(FakerSeed);
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        vacationDaysLeft: faker.number.float({
            multipleOf: 0.5,
            min: 5,
            max: 25,
        }),
    };
};

/**
 * Generates an array of fake approver objects with faker.js
 * @returns Array of fake `Approver` objects
 */
export const getFakeApprovers = (): Array<Approver> => {
    faker.seed(FakerSeed);
    return Array.from<never, Approver>(
        { length: faker.number.int({ min: 6, max: 12 }) },
        () => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            return {
                firstName,
                lastName,
                email: `${firstName}.${lastName}@example.com`.toLowerCase(),
            };
        }
    );
};
