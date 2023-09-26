import { useState } from 'react'
import Calendar from "./calendar/Calendar"
import ToDoAppBar from "./todo/toDoAddBar"
import SignUp from './auth/signup';
import './index.css'
import { AuthProvider } from './auth/authContext';

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
        <AuthProvider>
          <SignUp />
        </AuthProvider>
        <Calendar value={currentDate} onChange={handleCalendarChange} />
        <ToDoAppBar selectedDate={currentSelectedDate} />
      </div>
    </>

  )
}

export default App
