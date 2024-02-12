import { createMemo, createSignal } from 'solid-js';

export type Validation = {
    test: (val: string) => boolean;
    message: string;
};

/**
 * Checks if the value is an email
 */
export const IsEmail: Validation = {
    test: (val) => !/\w+@\w+/i.test(val),
    message: 'Value needs to be an email address',
};

/**
 * Checks if the value is filled out
 */
export const Required: Validation = {
    test: (val) => val.length === 0,
    message: 'Value is required',
};

/**
 * Checks if the value has the specified maximum length
 */
export const HasMaxLength = (num: number): Validation => ({
    test: (val) => val.length > num,
    message: `Value cannot be longer than ${num} characters`,
});

/**
 * Checks if the value has the specified maximum length
 */
export const HasMinLength = (num: number): Validation => ({
    test: (val) => val.length < num,
    message: `Value must have at least ${num} characters`,
});

/**
 * Checks if the value is a number
 */
export const IsNumber: Validation = {
    test: (val) => Number.isNaN(Number.parseFloat(val)),
    message: 'Value must be a number',
};

/**
 * Checks if the value contains only .5 decimals, not allowing others
 */
export const OnlyHalfDecimals: Validation = {
    test: (val) => {
        const remainder = Number.parseFloat(val) % 1;
        return remainder !== 0.5 && remainder !== 0;
    },
    message: `Value must be a multiple of 0.5`,
};

/**
 * Wrapper around a signal that performs validations on a given value
 * @param initialValue Initial value of the form input
 * @param validations An optional array of validations to perform on the input value
 * @returns An array containing a getter, setter and a getter for any validation errors
 */
export const createFormInput = (
    initialValue: string,
    validations?: Array<Validation>
) => {
    const [getValue, setValue] = createSignal(initialValue);

    const getValidationErrors = createMemo(() => {
        if (!validations || validations.length === 0) {
            return [];
        }

        const errors: string[] = [];

        validations.forEach((validation) => {
            if (validation.test(getValue())) {
                errors.push(validation.message);
            }
        });

        return errors;
    });

    return [getValue, setValue, getValidationErrors] as const;
};
