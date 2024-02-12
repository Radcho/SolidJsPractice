import { Component, For } from 'solid-js';
import styles from './Calendar.module.css';

const CalendarWeekLegend: Component = () => {
    const localizedWeekdays = Array.from({ length: 7 }, (_, i) => {
        return new Date(2001, 0, (i + 1) % 7).toLocaleDateString(undefined, {
            weekday: 'long',
        });
    });

    return (
        <div class={styles.calendarWeekdays}>
            <For each={localizedWeekdays}>
                {(nameOfWeekday) => (
                    <div class={styles.calendarWeekday}>{nameOfWeekday}</div>
                )}
            </For>
        </div>
    );
};

export default CalendarWeekLegend;
