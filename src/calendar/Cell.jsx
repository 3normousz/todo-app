import { useState } from 'react'
import '../index.css'

import clsx from 'clsx'

function Cell({ isEqualsToCurrentDate, isEqualsToSelectedDate, isSelectedFlag, className, onClick, isClickable = true, isDotCell = false, children }) {
    return (
        <>
            <div className={clsx("w-14 h-14 flex items-center justify-center cursor-default rounded-full",
                { "cursor-pointer": isClickable },
                { "dateCellSelectedBackgroundCustomColor text-white font-bold": isEqualsToCurrentDate && !isEqualsToSelectedDate && !isSelectedFlag },
                { "text-red-500 font-bold": isEqualsToCurrentDate && !isEqualsToSelectedDate && isSelectedFlag },
                { "dateCellCustomHover": !isEqualsToSelectedDate && isClickable && !isDotCell },
                { "dateCellSelectedBackgroundCustomColor text-white font-bold": (isEqualsToSelectedDate && !isEqualsToCurrentDate) || (isEqualsToSelectedDate && isEqualsToCurrentDate) },
                { "pointer-events-none": isDotCell },
                className)}
                onClick={onClick}>
                {children}
            </div >
        </>
    )
}

export default Cell
