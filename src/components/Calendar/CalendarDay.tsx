import { Component, Show, createSignal } from 'solid-js';
import styles from './Calendar.module.css';
import LeaveModal from '../LeaveModal';

export type CalendarDayProps = {
    year: number;
    month: number;
    monthChange: -1 | 0 | 1;
    dayNumber: number;
};

const CalendarDay: Component<CalendarDayProps> = (props) => {
    const [isModalOpen, setModalOpen] = createSignal(false);
    let modalActivator;

    const isDayDisabled = () => {
        if (props.monthChange !== 0) {
            return true;
        }

        const dayOfWeek = new Date(
            props.year,
            props.month,
            props.dayNumber
        ).getDay();

        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    return (
        <>
            <div
                ref={modalActivator}
                class={styles.calendarDay}
                classList={{
                    [styles.calendarDayDisabled]: isDayDisabled(),
                }}
            >
                <div class={styles.calendarDayNumber}>{props.dayNumber}</div>
            </div>
            <Show when={!isDayDisabled()}>
                <LeaveModal
                    menuButton={modalActivator}
                    open={isModalOpen}
                    setOpen={setModalOpen}
                    day={props.dayNumber}
                    month={props.month}
                    year={props.year}
                />
            </Show>
        </>
    );
};

export default CalendarDay;
