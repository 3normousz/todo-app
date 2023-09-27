import { useState } from 'react'
import Calendar from "./calendar/Calendar"
import ToDoAppBar from "./todo/toDoAddBar"
import SignUp from './auth/signup';
import Login from './auth/login';
import { AuthProvider } from './auth/authContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/calendar' element={
                <>
                  <Calendar value={currentDate} onChange={handleCalendarChange} />
                  <ToDoAppBar selectedDate={currentSelectedDate} />
                </>
              } />
            </Routes>
          </AuthProvider>
        </Router>

      </div>
    </>

  )
}

export default App
