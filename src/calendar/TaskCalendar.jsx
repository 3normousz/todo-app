import { useState } from 'react'
import { Helmet } from "react-helmet";
import { startOfMonth, endOfMonth, differenceInDays, sub, format, add, setDate, addMonths, subMonths } from 'date-fns'
import Cell from './Cell'
import '../index.css'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ displayMonthValue = new Date(), currentDateOnChange, currentSelectedDateOnChange, tasks }) {
    const [displayDate, setDisplayDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const today = new Date();

    const handleSetToday = () => {
        const today = new Date();
        setDisplayDate(today);
        setSelectedDate(today);
        if (currentDateOnChange && currentSelectedDateOnChange) {
            currentDateOnChange(today);
            currentSelectedDateOnChange(today);
        }
    };

    const handleClickDate = (day, isSuffix) => {
        let newDate;

        if (isSuffix == 1) {
            newDate = addMonths(displayMonthValue, 1);
            newDate.setDate(day);
        } else if (isSuffix == -1) {
            newDate = subMonths(displayMonthValue, 1);
            newDate.setDate(day);
        } else {
            newDate = setDate(displayMonthValue, day);
        }

        setSelectedDate(newDate);
        if (isSuffix == 1) {
            nextMonth();
        } else if (isSuffix == -1) {
            prevMonth();
        }
        if (currentSelectedDateOnChange) {
            currentSelectedDateOnChange(newDate);
        }
    };

    const startDate = startOfMonth(displayMonthValue);
    const endDate = endOfMonth(displayMonthValue);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const changeMonth = (offset) => {
        const newMonthDate = add(displayMonthValue, { months: offset });
        setDisplayDate(newMonthDate);
        if (currentDateOnChange) {
            currentDateOnChange(newMonthDate);
        }
    };

    const prevMonth = () => changeMonth(-1);
    const nextMonth = () => changeMonth(1);


    const prevMonthStartDate = startOfMonth(sub(displayMonthValue, { months: 1 }));
    const prevMonthEndDate = endOfMonth(sub(displayMonthValue, { months: 1 }));
    const numPrevMonthDays = differenceInDays(prevMonthEndDate, prevMonthStartDate) + 1;

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <style>{'body { background-color: #222222; }'}</style>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className='w-[400px] rounded shadow-xl p-2 bg-neutral-400'>
                <div className='grid grid-cols-7'>
                    <Cell className='col-span-4 font-bold w-44' isClickable={false}>{format(displayMonthValue, "LLLL yyyy")}</Cell>
                    <Cell className='col-span-1' onClick={handleSetToday}>{"Today"}</Cell>
                    <Cell className='col-span-1 font-bold' onClick={prevMonth}>{"<"}</Cell>
                    <Cell className='col-span-1 font-bold' onClick={nextMonth}>{">"}</Cell>

                    {daysOfWeek.map((day) => (
                        <Cell key={day} className="text-sm font-bold" isClickable={false}>
                            {day}
                        </Cell>
                    ))}

                    {Array.from({ length: prefixDays }).map((_, index) => {
                        const date = numPrevMonthDays - prefixDays + index + 1;

                        const dotDate = format(setDate(subMonths(displayMonthValue, 1), date), 'yyyy-MM-dd');
                        const hasTasks = tasks[dotDate] && tasks[dotDate].length > 0;

                        return <Cell
                            key={date}
                            onClick={() => { handleClickDate(date, -1); }}
                            className={`${hasTasks ? 'dateCellWithDot' : 'dateCellWithNoDot'} text-neutral-500`}>
                            {date}
                        </Cell>;
                    })}

                    {Array.from({ length: numDays }).map((_, index) => {
                        const date = index + 1;
                        const isCurrentDate = (
                            date === today.getDate() &&
                            displayDate.getMonth() === today.getMonth() &&
                            displayDate.getFullYear() === today.getFullYear()
                        );
                        let isSelectedDate = true;
                        let isSelectedFlag = false;
                        if (selectedDate) {
                            isSelectedDate = (
                                date === selectedDate.getDate() &&
                                displayDate.getMonth() === selectedDate.getMonth() &&
                                displayDate.getFullYear() === selectedDate.getFullYear()
                            );
                            isSelectedFlag = true;
                        }
                        const dotDate = format(setDate(displayMonthValue, date), 'yyyy-MM-dd');
                        const hasTasks = tasks[dotDate] && tasks[dotDate].length > 0;
                        const dateCell = (
                            <Cell
                                key={date}
                                onClick={() => handleClickDate(date, 0)}
                                isEqualsToCurrentDate={isCurrentDate}
                                isEqualsToSelectedDate={isSelectedDate}
                                isSelectedFlag={isSelectedFlag}
                                className={`${hasTasks ? 'dateCellWithDot' : 'dateCellWithNoDot'}`} >
                                {date}
                            </Cell>
                        );
                        return dateCell;
                    })}

                    {Array.from({ length: suffixDays }).map((_, index) => {
                        const date = index + 1;

                        const dotDate = format(setDate(addMonths(displayMonthValue, 1), date), 'yyyy-MM-dd');
                        const hasTasks = tasks[dotDate] && tasks[dotDate].length > 0;

                        const dateCell = (
                            <Cell
                                key={date}
                                onClick={() => handleClickDate(date, true)}
                                className={`${hasTasks ? 'dateCellWithDot' : 'dateCellWithNoDot'} text-neutral-500`} >
                                {date}
                            </Cell>
                        );
                        return dateCell;
                    })}
                </div>
            </div >
        </>
    )
}

export default Calendar
