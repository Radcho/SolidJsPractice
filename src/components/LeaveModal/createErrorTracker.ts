import { createSignal } from 'solid-js';

/**
 * Wrapper around a signal that is used for tracking any present errors on a form to disable certain actions.
 *
 * Specific errors are tracked on the inputs themselves, but this tracker tracks input identifiers and checks if an error is still present.
 * @returns An array containing a boolean getter describing if any errors are present, a method for adding an error source and a method for removing an error source
 */
const createErrorTracker = () => {
    const [getArray, setArray] = createSignal<Array<string>>([]);

    const addErrorIfNotExists = (item: string) => {
        if (!getArray().includes(item)) {
            setArray([...getArray(), item]);
        }
    };

    const removeErrorIfExists = (item: string) => {
        const itemIndex = getArray().indexOf(item);

        if (itemIndex !== -1) {
            setArray([
                ...getArray().slice(0, itemIndex),
                ...getArray().slice(itemIndex + 1),
            ]);
        }
    };

    const hasErrors = () => getArray().length > 0;

    return [hasErrors, addErrorIfNotExists, removeErrorIfExists] as const;
};

export default createErrorTracker;
