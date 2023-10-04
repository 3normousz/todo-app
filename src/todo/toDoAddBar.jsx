import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import TaskList from './taskList'
import { auth, db } from '../auth/firebase'
import '../index.css'

import firebase from 'firebase/compat/app'
import { getDatabase, ref, child, push, update, set } from "firebase/database";
import 'firebase/compat/auth';

function ToDoAppBar({ selectedDate }) {
    const [tasks, setTasks] = useState({});

    const handleTaskSubmit = (taskText) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            setTasks((prevTasks) => ({
                ...prevTasks,
                [formattedDate]: [...(prevTasks[formattedDate] || []), taskText],
            }));

            console.log(tasks);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            let user = auth.currentUser;
            let uid = user.uid;
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');

            // Assuming that you want to call writeUserData whenever tasks change
            writeUserData(uid, tasks);
        }
    }, [selectedDate, tasks]);



    function writeUserData(userId, tasks) {
        const db = getDatabase();

        // Construct the path to the user's tasks.
        const userTasksRef = ref(db, `/user/${userId}/tasks`);

        // Push the new tasks to the user's tasks path.
        const newTaskRef = push(userTasksRef);

        // Set the new task data with a unique key.
        return set(newTaskRef, tasks);
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
                            />
                            <button type="submit" className="bg-blue-500 text-white px-2 py-1 ml-2 rounded">
                                Add Task
                            </button>
                        </form>
                    )}
                </div>
                <TaskList selectedDate={selectedDate} tasks={tasks} />
            </div>
        </>
    )
}

export default ToDoAppBar