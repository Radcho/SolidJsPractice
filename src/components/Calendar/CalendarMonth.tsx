import { Component, For } from 'solid-js';
import CalendarDay, { CalendarDayProps } from './CalendarDay';
import styles from './Calendar.module.css';

type CalendarMonthProps = {
    month: number;
    year: number;
};

type DayOfTheWeek = Pick<CalendarDayProps, 'dayNumber' | 'monthChange'>;

const CalendarMonth: Component<CalendarMonthProps> = (props) => {
    const getDaysOfMonth = () => {
        const firstDateOfMonth = new Date(props.year, props.month, 1);
        const finalDateOfMonth = new Date(props.year, props.month + 1, 0);
        const firstDay = firstDateOfMonth.getDay();
        const days: Array<Array<DayOfTheWeek>> = [];

        // Add days from the previous month to fill out the week
        if (firstDay !== 1) {
            const finalDayOfLastMonth = new Date(
                props.year,
                props.month,
                0
            ).getDate();

            const previousDays = (firstDay + 6) % 7;
            const previousDaysArray = Array.from<unknown, DayOfTheWeek>(
                { length: previousDays },
                (_, i) => {
                    return {
                        monthChange: -1,
                        dayNumber: finalDayOfLastMonth - i,
                    };
                }
            ).reverse();
            days.push(previousDaysArray);
        } else {
            days.push([]);
        }

        // Add all the current month's days
        let currentDay = 1;
        while (currentDay <= finalDateOfMonth.getDate()) {
            days[days.length - 1].push({
                monthChange: 0,
                dayNumber: currentDay,
            });

            if (
                days[days.length - 1].length === 7 &&
                currentDay !== finalDateOfMonth.getDate()
            ) {
                days.push([]);
            }

            currentDay += 1;
        }

        // Add all the days from the next month
        if (days[days.length - 1].length < 7) {
            const nextDaysArray = Array.from<unknown, DayOfTheWeek>(
                { length: 7 - days[days.length - 1].length },
                (_, i) => {
                    return {
                        monthChange: +1,
                        dayNumber: 1 + i,
                    };
                }
            );
            days[days.length - 1].push(...nextDaysArray);
        }

        return days;
    };

    return (
        <div class={styles.calendarMonth}>
            <For each={getDaysOfMonth()}>
                {(week) => (
                    <div class={styles.calendarWeek}>
                        <For each={week}>
                            {(day) => (
                                <CalendarDay
                                    dayNumber={day.dayNumber}
                                    monthChange={day.monthChange}
                                    month={props.month}
                                    year={props.year}
                                />
                            )}
                        </For>
                    </div>
                )}
            </For>
        </div>
    );
};

export default CalendarMonth;
