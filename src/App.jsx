import { useState } from 'react'
import Calendar from "./Calendar/Calendar"
import './index.css'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <>
      <div className='mt-16 flex flex-col items-center'>
        <Calendar value={currentDate} onChange={setCurrentDate} />
      </div>
    </>

  )
}

export default App
