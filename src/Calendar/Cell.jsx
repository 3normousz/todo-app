import { useState } from 'react'
import '../index.css'

import clsx from 'clsx'

function Cell({ className, children }) {
    return (
        <>
            <div className={clsx("h-12 flex items-center justify-center", className)}>{children}</div>
        </>
    )
}

export default Cell
