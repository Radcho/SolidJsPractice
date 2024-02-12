import { Component, For, createEffect } from 'solid-js';
import { Validation, createFormInput } from './createFormInput';
import styles from './LeaveModal.module.css';

type FormSelectInputProps = {
    label: string;
    initialValue?: string;
    options: Array<{ label: string; value: string }>;
    disabled?: boolean;
    autofocus?: boolean;
    validations?: Array<Validation>;
    onInput: (newValue: string, hasErrors: boolean) => void;
};

const FormSelectInput: Component<FormSelectInputProps> = (props) => {
    const [getValue, setValue, getErrors] = createFormInput(
        props.initialValue ?? '',
        // eslint-disable-next-line solid/reactivity
        props.validations
    );

    createEffect(() => {
        props.onInput(getValue(), getErrors().length > 0);
    });

    return (
        <div class={styles.formInput}>
            <label for={props.label}>{props.label}</label>
            <select
                name={props.label}
                autofocus={props.autofocus}
                disabled={props.disabled}
                onChange={(e) => setValue(e.currentTarget.value)}
                classList={{
                    [styles.emptyOption]: getValue() === '',
                }}
            >
                <option class={styles.emptyOption} selected value=''>
                    -- Select an option --
                </option>
                <For each={props.options}>
                    {(item) => (
                        <option
                            class={styles.option}
                            selected={item.value === getValue()}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    )}
                </For>
            </select>
            <For each={getErrors()}>
                {(err) => <small class={styles.formError}>{err}</small>}
            </For>
        </div>
    );
};

export default FormSelectInput;
