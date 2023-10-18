import { useState } from 'react'
import Calendar from "./calendar/TaskCalendar"
import ToDoAppBar from "./todo/toDoAddBar"
import SignUp from './auth/signup';
import Login from './auth/login';
import { AuthProvider } from './auth/authContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoutes';
import './index.css'



function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentSelectedDate, setCurrentSelectedDate] = useState(new Date());
  const [tasksForDotDisplay, setTasksForDotDisplay] = useState({});

  const handleCurrentDateChange = (newDate) => {
    setCurrentDate(newDate);
  };
  const handleCurrentSelectedDateChange = (newDate) => {
    setCurrentSelectedDate(newDate);
  };
  const handleSetTasksForDotDisplay = (tasks) => {
    setTasksForDotDisplay(tasks);
  }

  return (
    <>
      <div className='mt-16 flex flex-col items-center'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path='/calendar' element={
                  <>
                    <Calendar
                      displayMonthValue={currentDate}
                      currentDateOnChange={handleCurrentDateChange}
                      currentSelectedDateOnChange={handleCurrentSelectedDateChange}
                      tasks={tasksForDotDisplay} />
                    <ToDoAppBar selectedDate={currentSelectedDate} tasksUpdateDotDisplay={handleSetTasksForDotDisplay} />
                  </>
                }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>

      </div>
    </>

  )
}

export default App