import { useState } from 'react'
import { startOfMonth, endOfMonth, differenceInDays, sub, format, add, setDate, addMonths, subMonths } from 'date-fns'
import Cell from './Cell'
import '../index.css'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ displayMonthValue = new Date(), currentDateOnChange, currentSelectedDateOnChange, tasks }) {
    const [displayDate, setDisplayDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [beforeLastGridDate, setBeforeLastGridDate] = useState(null);

    const today = new Date();

    const handleSetToday = () => {
        const today = new Date();
        setDisplayDate(today);
        setSelectedDate(today);
        if (currentDateOnChange && currentSelectedDateOnChange) {
            currentDateOnChange(today);
            currentSelectedDateOnChange(today);
        }
        setBeforeLastGridDate(null);
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
        setBeforeLastGridDate(null);
    };

    const prevMonth = () => changeMonth(-1);
    const nextMonth = () => changeMonth(1);


    const prevMonthStartDate = startOfMonth(sub(displayMonthValue, { months: 1 }));
    const prevMonthEndDate = endOfMonth(sub(displayMonthValue, { months: 1 }));
    const numPrevMonthDays = differenceInDays(prevMonthEndDate, prevMonthStartDate) + 1;

    return (
        <>
            <div className='w-[400px] border rounded shadow-xl p-2'>
                <div className='grid grid-cols-7'>
                    <Cell className='col-span-4 font-bold w-44' isClickable={false}>{format(displayMonthValue, "LLLL yyyy")}</Cell>
                    <Cell className='col-span-1' onClick={handleSetToday}>{"Today"}</Cell>
                    <Cell className='col-span-1 font-bold' onClick={prevMonth}>{"<"}</Cell>
                    <Cell className='col-span-1 font-bold' onClick={nextMonth}>{">"}</Cell>

                    {daysOfWeek.map((day) => (
                        <Cell key={day} className="text-sm font-bold" isClickable={false}>
                            {day}
                        </Cell>))}

                    {Array.from({ length: prefixDays }).map((_, index) => {
                        const date = numPrevMonthDays - prefixDays + index + 1;
                        return <Cell key={date}
                            onClick={() => { handleClickDate(date, -1); }} className='text-neutral-300'>
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

                        const dateCell = (
                            <Cell
                                key={date}
                                onClick={() => handleClickDate(date, 0)}
                                isEqualsToCurrentDate={isCurrentDate}
                                isEqualsToSelectedDate={isSelectedDate}
                                isSelectedFlag={isSelectedFlag} >
                                {date}
                            </Cell>
                        );

                        if ((index + prefixDays) % 7 === 0 && index !== 0) {
                            const start = 6;
                            const end = 0;
                            const dotCellCount = start - end + 1;
                            const dotCells = [];
                            if (prefixDays > 0 && index + prefixDays === 7) {
                                const daysFromPreviousMonth = prefixDays;
                                let dotDateKeyValue;
                                for (let i = daysFromPreviousMonth - 1; i >= 0; i--) {
                                    const currentIndex = end + i;

                                    const dotDate = format(setDate(displayMonthValue, end + currentIndex), 'yyyy-MM-dd');
                                    dotDateKeyValue = format(setDate(displayMonthValue, end + currentIndex), 'MM');

                                    const hasTasks = tasks[dotDate] && tasks[dotDate].length > 0;
                                    const dotCellClass = hasTasks ? 'dot-red' : 'dot-white';
                                    dotCells.push(
                                        <Cell key={`dot-${date}-${i}-${dotDateKeyValue}`} className={`${dotCellClass} place-self-center`} isDotCell={true}>
                                        </Cell>
                                    );
                                }
                                for (let i = daysFromPreviousMonth - 7; i < 0; i++) {
                                    dotCells.push(
                                        <Cell key={`dot-${date}-${i}-${dotDateKeyValue}`} className={`dot-white place-self-center`} isDotCell={true}>
                                        </Cell>
                                    );
                                }
                            }
                            for (let i = 0; i < dotCellCount; i++) {
                                const currentIndex = start - i;

                                const dotDate = format(setDate(displayMonthValue, index - currentIndex), 'yyyy-MM-dd');

                                const hasTasks = tasks[dotDate] && tasks[dotDate].length > 0;
                                const dotCellClass = hasTasks ? 'dot-red' : 'dot-white';

                                if (i == dotCellCount - 1 && !beforeLastGridDate) {
                                    setBeforeLastGridDate(dotDate);
                                }

                                dotCells.push(
                                    <Cell key={`dot-${date}-${i}`} className={`${dotCellClass} place-self-center`} isDotCell={true}>
                                    </Cell>
                                );
                            }
                            return [dotCells, dateCell];
                        }


                        return dateCell;
                    })}



                    {Array.from({ length: suffixDays }).map((_, index) => {
                        const date = index + 1;

                        const dateCell = (
                            <Cell
                                key={date}
                                onClick={() => handleClickDate(date, true)}
                                className='text-neutral-300' >
                                {date}
                            </Cell>
                        );

                        if (date == suffixDays && beforeLastGridDate) {
                            const start = beforeLastGridDate.substr(8, 2);
                            const end = endDate.getDate();
                            const dotCellCount = end - start;

                            const dotCells = [];
                            for (let i = 1; i <= dotCellCount + suffixDays; i++) {
                                const currentIndex = parseInt(beforeLastGridDate.substr(8, 2)) + i;

                                const dotDate = format(setDate(displayMonthValue, currentIndex), 'yyyy-MM-dd');

                                const hasTasks = tasks[dotDate] && tasks[dotDate].length > 0;
                                const dotCellClass = hasTasks ? 'dot-red' : 'dot-white';

                                dotCells.push(
                                    <Cell key={`dot-${date}-${i}`} className={`${dotCellClass} place-self-center`} isDotCell={true}></Cell>
                                );
                            }
                            return [dateCell, dotCells];
                        }
                        return <Cell
                            key={date}
                            onClick={() => { handleClickDate(date, 1); }} className='text-neutral-300'>
                            {date}
                        </Cell>;
                    })}
                </div>
            </div>
        </>
    )
}

export default Calendar
