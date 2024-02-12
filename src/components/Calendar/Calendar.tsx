import { Component, createSignal } from 'solid-js';
import styles from './Calendar.module.css';
import CalendarDate from './CalendarDate';
import CalendarMonth from './CalendarMonth';
import CalendarWeekLegend from './CalendarWeekLegend';

/**
 * The main component containing all other calendar pieces
 */
const Calendar: Component = () => {
    const [getMonth, setMonth] = createSignal(new Date().getMonth());
    const [getYear, setYear] = createSignal(new Date().getFullYear());

    return (
        <div class={styles.calendar}>
            <CalendarDate
                onChange={(month, year) => {
                    setMonth(month);
                    setYear(year);
                }}
            />
            <CalendarWeekLegend />
            <CalendarMonth month={getMonth()} year={getYear()} />
        </div>
    );
};

export default Calendar;
