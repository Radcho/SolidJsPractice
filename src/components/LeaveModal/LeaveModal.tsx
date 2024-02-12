import Dismiss, { TDismiss } from 'solid-dismiss';
import { Component, createResource, createSignal } from 'solid-js';
import styles from './LeaveModal.module.css';
import { wait } from '../../utils/mockUtil';
import createErrorTracker from './createErrorTracker';
import leaveService from '../../services/leaveService';
import LoadingIndicator from '../LoadingIndicator';
import FormSelectInput from './FormSelectInput';
import { IsNumber, OnlyHalfDecimals, Required } from './createFormInput';
import { LeaveOptions } from './leave';
import FormInput from './FormInput';

type LeaveModalProps = Pick<TDismiss, 'open' | 'setOpen' | 'menuButton'> & {
    day: number;
    month: number;
    year: number;
};

const LeaveModal: Component<LeaveModalProps> = (props) => {
    const [isSubmittingForm, setSubmittingForm] = createSignal(false);
    const [hasErrors, addErrorIfNotExists, removeErrorIfExists] =
        createErrorTracker();

    const [approvers] = createResource(() => leaveService.getListOfApprovers());
    const getApproverOptions = (without?: string) => {
        return (
            approvers()
                ?.filter((approver) => approver.email !== without)
                .map((approver) => ({
                    label: `${approver.firstName} ${approver.lastName} (${approver.email})`,
                    value: approver.email,
                })) ?? []
        );
    };

    const [getApproverEmail, setApproverEmail] = createSignal('');
    const [getBackupApproverEmail, setBackupApproverEmail] = createSignal('');
    const [getTypeOfLeave, setTypeOfLeave] = createSignal('');
    const [getAmountOfLeave, setAmountOfLeave] = createSignal(0);
    const [getBackup, setBackup] = createSignal('');

    const getDisplayDate = () => {
        return new Date(props.year, props.month, props.day).toLocaleDateString(
            undefined,
            { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' }
        );
    };

    const onClickOverlay = (e: Event) => {
        if (e.target !== e.currentTarget) return;
        props.setOpen(false);
    };

    const canSubmit = () => {
        return !isSubmittingForm() && !hasErrors();
    };

    const submitLeave = async (e: Event) => {
        e.preventDefault();

        if (canSubmit()) {
            setSubmittingForm(true);
            await wait(500);
            console.log(
                getApproverEmail(),
                getBackupApproverEmail(),
                getTypeOfLeave(),
                getAmountOfLeave(),
                getBackup()
            );
            setSubmittingForm(false);
            props.setOpen(false);
        }
    };

    return (
        <Dismiss
            menuButton={props.menuButton}
            open={props.open}
            setOpen={props.setOpen}
            focusElementOnOpen='menuPopup'
            modal
        >
            <div
                class={styles.overlay}
                onClick={onClickOverlay}
                role='presentation'
            >
                <div
                    class={styles.modal}
                    role='dialog'
                    aria-modal='true'
                    tabindex='-1'
                >
                    <LoadingIndicator
                        show={isSubmittingForm() || approvers.loading}
                    />
                    <h4>{getDisplayDate()}</h4>
                    <form class={styles.form} onSubmit={(e) => submitLeave(e)}>
                        <FormSelectInput
                            label='Approver Email'
                            disabled={isSubmittingForm()}
                            initialValue=''
                            autofocus
                            validations={[Required]}
                            options={getApproverOptions(
                                getBackupApproverEmail()
                            )}
                            onInput={(newValue, inputHasErrors) => {
                                setApproverEmail(newValue);
                                if (inputHasErrors) {
                                    addErrorIfNotExists('Approver Email');
                                } else {
                                    removeErrorIfExists('Approver Email');
                                }
                            }}
                        />
                        <FormSelectInput
                            label='Backup Approver Email'
                            disabled={isSubmittingForm()}
                            initialValue=''
                            validations={[Required]}
                            options={getApproverOptions(getApproverEmail())}
                            onInput={(newValue, inputHasErrors) => {
                                setBackupApproverEmail(newValue);
                                if (inputHasErrors) {
                                    addErrorIfNotExists(
                                        'Backup Approver Email'
                                    );
                                } else {
                                    removeErrorIfExists(
                                        'Backup Approver Email'
                                    );
                                }
                            }}
                        />
                        <FormSelectInput
                            label='Type of Leave'
                            disabled={isSubmittingForm()}
                            initialValue=''
                            validations={[Required]}
                            options={LeaveOptions}
                            onInput={(newValue, inputHasErrors) => {
                                setTypeOfLeave(newValue);
                                if (inputHasErrors) {
                                    addErrorIfNotExists('Type of Leave');
                                } else {
                                    removeErrorIfExists('Type of Leave');
                                }
                            }}
                        />
                        <FormInput
                            label='Number of days'
                            disabled={isSubmittingForm()}
                            initialValue=''
                            type='number'
                            validations={[Required, IsNumber, OnlyHalfDecimals]}
                            onInput={(newValue, inputHasErrors) => {
                                setAmountOfLeave(Number.parseFloat(newValue));
                                if (inputHasErrors) {
                                    addErrorIfNotExists('Type of Leave');
                                } else {
                                    removeErrorIfExists('Type of Leave');
                                }
                            }}
                        />
                        <FormInput
                            label='Backup'
                            disabled={isSubmittingForm()}
                            initialValue=''
                            type='textarea'
                            validations={[Required]}
                            onInput={(newValue, inputHasErrors) => {
                                setBackup(newValue);
                                if (inputHasErrors) {
                                    addErrorIfNotExists('Backup');
                                } else {
                                    removeErrorIfExists('Backup');
                                }
                            }}
                        />
                        <button
                            type='submit'
                            title='Submit'
                            disabled={!canSubmit()}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Dismiss>
    );
};

export default LeaveModal;
