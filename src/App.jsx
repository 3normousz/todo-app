import { useState } from 'react'
import { Helmet } from 'react-helmet';
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
        <Helmet>
          <title>toDoApp | Login</title>
          <meta name='description' content='An to do app, with a built-in calendar' />
          <style>{'body { background-color: #222222; }'}</style>
        </Helmet>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path='/calendar' element={
                  <>
                    <div className='w-[350px] md:w-[400px] mb-6'>
                      <Calendar
                        displayMonthValue={currentDate}
                        currentDateOnChange={handleCurrentDateChange}
                        currentSelectedDateOnChange={handleCurrentSelectedDateChange}
                        tasks={tasksForDotDisplay} />
                      <ToDoAppBar selectedDate={currentSelectedDate} tasksUpdateDotDisplay={handleSetTasksForDotDisplay} />
                    </div>
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