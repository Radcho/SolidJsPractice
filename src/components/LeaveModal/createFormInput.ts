import { createMemo, createSignal } from 'solid-js';

export type Validation = {
    test: (val: string) => boolean;
    message: string;
};

export const IsEmail: Validation = {
    test: (val) => !/\w+@\w+/i.test(val),
    message: 'Value needs to be an email address',
};

export const Required: Validation = {
    test: (val) => val.length === 0,
    message: 'Value is required',
};

export const HasMaxLength = (num: number): Validation => ({
    test: (val) => val.length > num,
    message: `Value cannot be longer than ${num} characters`,
});

export const HasMinLength = (num: number): Validation => ({
    test: (val) => val.length < num,
    message: `Value must have at least ${num} characters`,
});

export const IsNumber: Validation = {
    test: (val) => Number.isNaN(Number.parseFloat(val)),
    message: 'Value must be a number',
};

export const OnlyHalfDecimals: Validation = {
    test: (val) => {
        const remainder = Number.parseFloat(val) % 1;
        return remainder !== 0.5 && remainder !== 0;
    },
    message: `Value must be a multiple of 0.5`,
};

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
