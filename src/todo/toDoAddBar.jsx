import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import TaskList from './taskList'
import { auth } from '../auth/firebase'
import '../index.css'

import { getDatabase, ref, get, set } from "firebase/database";
import 'firebase/compat/auth';

function ToDoAppBar({ selectedDate, tasksUpdateDotDisplay }) {
    const [tasks, setTasks] = useState({});

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const user = auth.currentUser;
    const uid = user.uid;

    useEffect(() => {
        if (selectedDate) {
            readUserData(uid, formattedDate);
        }
    }, []);

    const handleTaskSubmit = (taskText) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            setTasks((prevTasks) => ({
                ...prevTasks,
                [formattedDate]: [...(prevTasks[formattedDate] || []), taskText],
            }));
            tasksUpdateDotDisplay((prevTasks) => ({
                ...prevTasks,
                [formattedDate]: [...(prevTasks[formattedDate] || []), taskText],
            }));
        }
    };

    const handleDeleteTask = (date, taskIndex) => {
        const updatedTasks = { ...tasks };

        if (updatedTasks[date]) {
            updatedTasks[date] = updatedTasks[date].filter((_, index) => index !== taskIndex);
        }

        setTasks(updatedTasks);
        tasksUpdateDotDisplay(tasks);
    };


    useEffect(() => {
        if (selectedDate && Object.keys(tasks).length > 0) {
            writeUserData(uid, tasks);
        }
    }, [selectedDate, tasks]);



    function writeUserData(userId, newTask) {
        const db = getDatabase();

        set(ref(db, `/user/${userId}`), {
            tasks: newTask
        });
    }

    function readUserData(userId) {
        const dbRef = ref(getDatabase(), `user/${userId}/tasks/`);

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setTasks(data);
                tasksUpdateDotDisplay(data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="my-4">
                <h3 className='mt-6 my-6 font-bold text-center'>
                    {format(selectedDate, 'MMMM dd, yyyy')}
                </h3>
                <div className='text-center'>
                    {(
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleTaskSubmit(e.target.task.value);
                            e.target.task.value = '';
                        }}>
                            <input
                                type="text"
                                name="task"
                                placeholder="Enter a task..."
                                className="border rounded px-2 py-1"
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white font-bold px-2 py-1 ml-2 rounded">
                                Add Task
                            </button>
                        </form>
                    )}
                </div>
                <TaskList selectedDate={selectedDate} tasks={tasks} onDeleteTask={handleDeleteTask} />
            </div>
        </>
    )
}

export default ToDoAppBar