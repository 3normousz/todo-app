import { useState } from 'react'
import Calendar from "./calendar/Calendar"
import ToDoAppBar from "./todo/toDoAddBar"
import './index.css'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentSelectedDate, setCurrentSelectedDate] = useState(new Date());

  const handleCalendarChange = (newDate) => {
    setCurrentDate(newDate);
    setCurrentSelectedDate(newDate);
  };

  return (
    <>
      <div className='mt-16 flex flex-col items-center'>
        <Calendar value={currentDate} onChange={handleCalendarChange} />
        <ToDoAppBar selectedDate={currentSelectedDate} />
      </div>
    </>

  )
}

export default App
