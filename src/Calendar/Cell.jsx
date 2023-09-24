import { useState } from 'react'
import '../index.css'

import clsx from 'clsx'

function Cell({ isEqualsToCurrentDate, isEqualsToSelectedDate, isSelectedFlag, className, onClick, children }) {
    return (
        <>
            <div className={clsx("w-14 h-14 flex items-center justify-center cursor-pointer rounded-full",
                { "bg-blue-500 text-white font-bold": isEqualsToCurrentDate && !isEqualsToSelectedDate && !isSelectedFlag },
                { "text-red-500 font-bold": isEqualsToCurrentDate && !isEqualsToSelectedDate && isSelectedFlag },
                { "hover:bg-gray-100": !isEqualsToCurrentDate && !isEqualsToSelectedDate },
                { "bg-blue-500 text-white font-bold": (isEqualsToSelectedDate && !isEqualsToCurrentDate) || (isEqualsToSelectedDate && isEqualsToCurrentDate) },
                className)}
                onClick={onClick}>
                {children}
            </div >
        </>
    )
}

export default Cell
