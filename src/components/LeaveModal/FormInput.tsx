import { Component, For, Show, createEffect } from 'solid-js';
import {
    OnlyHalfDecimals,
    Validation,
    createFormInput,
} from './createFormInput';
import styles from './LeaveModal.module.css';

type FormInputProps = {
    label: string;
    type: 'text' | 'number' | 'textarea';
    initialValue?: string;
    disabled?: boolean;
    autofocus?: boolean;
    validations?: Array<Validation>;
    onInput: (newValue: string, hasErrors: boolean) => void;
};

const FormInput: Component<FormInputProps> = (props) => {
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
            <Show
                when={props.type === 'textarea'}
                fallback={
                    <input
                        type={props.type}
                        name={props.label}
                        placeholder={props.label}
                        autofocus={props.autofocus}
                        disabled={props.disabled}
                        step={
                            props.validations?.includes(OnlyHalfDecimals)
                                ? 0.5
                                : undefined
                        }
                        onInput={(e) => setValue(e.target.value)}
                    />
                }
            >
                <textarea
                    name={props.label}
                    placeholder={props.label}
                    autofocus={props.autofocus}
                    disabled={props.disabled}
                    onInput={(e) => setValue(e.target.value)}
                />
            </Show>
            <For each={getErrors()}>
                {(err) => <small class={styles.formError}>{err}</small>}
            </For>
        </div>
    );
};

export default FormInput;
