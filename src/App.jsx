import { useState } from 'react'
import Calendar from "./Calendar/Calendar"
import './index.css'

function App() {
  return (
    <>
      <div className='mt-16 flex flex-col items-center'>
        <Calendar />
      </div>
    </>

  )
}

export default App
