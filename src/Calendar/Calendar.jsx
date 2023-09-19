import { useState } from 'react'
import { startOfMonth, endOfMonth, differenceInDays, sub, format, add } from 'date-fns'
import Cell from './Cell'
import '../index.css'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ value = new Date(), onChange }) {
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => onChange && onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange && onChange(add(value, { months: 1 }));

    const prevMonthStartDate = startOfMonth(sub(value, { months: 1 }));
    const prevMonthEndDate = endOfMonth(sub(value, { months: 1 }));
    const numPrevMonthDays = differenceInDays(prevMonthEndDate, prevMonthStartDate) + 1;

    return (
        <>
            <div className='w-[400px] border'>
                <div className='grid grid-cols-7'>
                    <Cell className='col-span-5 font-bold'>{format(value, "LLLL yyyy")}</Cell>
                    <Cell className='col-span-1 font-bold' onClick={prevMonth}>{"<"}</Cell>
                    <Cell className='col-span-1 font-bold' onClick={nextMonth}>{">"}</Cell>

                    {daysOfWeek.map((day) => (
                        <Cell key={day} className="text-sm font-bold">
                            {day}
                        </Cell>))}

                    {Array.from({ length: prefixDays }).map((_, index) => {
                        const date = numPrevMonthDays - prefixDays + index + 1;
                        return <Cell className='text-neutral-300'>{date}</Cell>;
                    })}

                    {Array.from({ length: numDays }).map((_, index) => {
                        const date = index + 1;
                        return <Cell>{date}</Cell>;
                    })}

                    {Array.from({ length: suffixDays }).map((_, index) => {
                        const date = index + 1;
                        return <Cell className='text-neutral-300'>{date}</Cell>;
                    })}
                </div>
            </div>
        </>
    )
}

export default Calendar
