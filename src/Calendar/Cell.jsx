import { useState } from 'react'
import '../index.css'

import clsx from 'clsx'

function Cell({ className, onClick, children }) {
    return (
        <>
            <div className={clsx("h-12 flex items-center justify-center hover:bg-gray-100", className)}
                onClick={onClick}>
                {children}
            </div>
        </>
    )
}

export default Cell
