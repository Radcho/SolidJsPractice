import { createSignal } from 'solid-js';

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
