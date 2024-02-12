import { faker } from '@faker-js/faker';
import User from '../interfaces/user';
import Approver from '../interfaces/approver';

export const wait = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const fakerSeed = Date.now();

export const getFakeUser = (): User => {
    faker.seed(fakerSeed);
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

export const getFakeApprovers = (): Array<Approver> => {
    faker.seed(fakerSeed);
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
