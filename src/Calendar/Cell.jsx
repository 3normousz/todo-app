import { useState } from 'react'
import '../index.css'

import clsx from 'clsx'

function Cell({ isActive, isSelected, isSelectedFlag, className, onClick, children }) {
    return (
        <>
            <div className={clsx("w-14 h-14 flex items-center justify-center cursor-pointer rounded-full",
                { "bg-blue-500 text-white font-bold": isActive && !isSelected && !isSelectedFlag },
                { "text-red-500 font-bold": isActive && !isSelected && isSelectedFlag },
                { "hover:bg-gray-100": !isActive && !isSelected },
                { "bg-blue-500 text-white font-bold": (isSelected && !isActive) || (isSelected && isActive) },
                className)}
                onClick={onClick}>
                {children}
            </div >
        </>
    )
}

export default Cell
