import { Component, createSignal } from 'solid-js';
import styles from './Calendar.module.css';
import user from '../../stores/user';

type CalendarDateProps = {
    onChange: (month: number, year: number) => void;
};

const CalendarDate: Component<CalendarDateProps> = (props) => {
    const { getUser } = user;

    const [getMonth, setMonth] = createSignal(new Date().getMonth());
    const [getYear, setYear] = createSignal(new Date().getFullYear());

    const getDisplayMonth = () => {
        const fakeDate = new Date(1);
        fakeDate.setMonth(getMonth());

        return fakeDate.toLocaleDateString(undefined, { month: 'long' });
    };

    const goToPreviousPage = () => {
        if (getMonth() === 0) {
            setMonth(11);
            setYear(getYear() - 1);
        } else {
            setMonth(getMonth() - 1);
        }
        props.onChange(getMonth(), getYear());
    };

    const goToNextPage = () => {
        if (getMonth() === 11) {
            setMonth(0);
            setYear(getYear() + 1);
        } else {
            setMonth(getMonth() + 1);
        }
        props.onChange(getMonth(), getYear());
    };

    return (
        <div class={styles.calendarDateRow}>
            <button
                onClick={() => goToPreviousPage()}
                class={styles.calendarDateButton}
            >
                &#x226A;
            </button>
            <div class={styles.calendarDateMonth}>{getDisplayMonth()}</div>
            <div class={styles.calendarDateYear}>{getYear()}</div>
            <button
                onClick={() => goToNextPage()}
                class={styles.calendarDateButton}
            >
                &#x226B;
            </button>
            <div class={styles.daysInfo}>
                Unallocated days left:{' '}
                <strong>{getUser()?.vacationDaysLeft || 0}</strong>
            </div>
        </div>
    );
};

export default CalendarDate;
