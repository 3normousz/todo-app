import { useState } from 'react'
import { startOfMonth, endOfMonth, differenceInDays } from 'date-fns'
import Cell from './Cell'
import '../index.css'

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ value = new Date(), onChange }) {
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();

    console.log(value);
    console.log(prefixDays);

    return (
        <>
            <div className='w-[400px] border'>
                <div className='grid grid-cols-7'>
                    <Cell>{"<<"}</Cell>
                    <Cell>{"<"}</Cell>
                    <Cell className='col-span-3 font-bold'>July 2022</Cell>
                    <Cell>{">"}</Cell>
                    <Cell>{">>"}</Cell>

                    {daysOfWeek.map((day) => (
                        <Cell key={day} className="text-sm font-bold">
                            {day}
                        </Cell>))}

                    {Array.from({ length: prefixDays }).map((_, index) => (
                        <Cell />
                    ))}

                    {Array.from({ length: numDays }).map((_, index) => {
                        const date = index + 1;
                        return <Cell>{date}</Cell>;
                    })}
                </div>
            </div>
        </>
    )
}

export default Calendar
