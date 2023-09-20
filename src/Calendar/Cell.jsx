import { useState } from 'react'
import '../index.css'

import clsx from 'clsx'

function Cell({ isActive, className, onClick, children }) {
    return (
        <>
            <div className={clsx("h-12 flex items-center justify-center cursor-pointer",
                { "bg-blue-500 text-white": isActive },
                { "hover:bg-gray-100": !isActive },
                className)}
                onClick={onClick}>
                {children}
            </div>
        </>
    )
}

export default Cell
