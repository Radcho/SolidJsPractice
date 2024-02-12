/**
 * Helper method for working with classes. It accepts any number of strings and joins them into a single, space-separated string, for ease of use.
 * @param classes Any classes that will be joined together into a single class string
 * @returns Classes joined together into a single string
 */
export const joinClasses = (...classes: Array<string>): string => {
    return classes.join(' ');
};
