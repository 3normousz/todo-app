import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import TaskList from './taskList'

import '../index.css'
import { Clock, Plus } from "@phosphor-icons/react";

import { auth } from '../auth/firebase'
import { getDatabase, ref, get, set } from "firebase/database";

function ToDoAppBar({ selectedDate, tasksUpdateDotDisplay }) {
    const [tasks, setTasks] = useState({});

    const textInput = useRef(null);

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
                [formattedDate]: [
                    ...(prevTasks[formattedDate] || []),
                    {
                        task: taskText,
                        isCleared: false
                    },
                ],
            }));
            tasksUpdateDotDisplay((prevTasks) => ({
                ...prevTasks,
                [formattedDate]: [
                    ...(prevTasks[formattedDate] || []),
                    {
                        task: taskText,
                        isCleared: false
                    },
                ],
            }));
        }
    };

    const handleDeleteTask = (date, taskIndex) => {
        const updatedTasks = { ...tasks };

        if (updatedTasks[date]) {
            updatedTasks[date] = updatedTasks[date].filter((_, index) => index !== taskIndex);
        }

        setTasks(updatedTasks);
        tasksUpdateDotDisplay(updatedTasks);
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

    const handleClearedTaskUpdate = (newTasks) => {
        setTasks(newTasks);
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleTaskSubmit(textInput.current.value);

        textInput.current.value = '';
    };

    return (
        <>
            <div className="my-4">
                <h3 className='mt-6 my-6 font-bold text-center text-white'>
                    {format(selectedDate, 'MMMM dd, yyyy')}
                </h3>
                <div className='text-center'>
                    <form onSubmit={handleFormSubmit}>
                        <div className='flex flex-col'>
                            <div>
                                <div className="task-input-style">
                                    <input type="text" className='' ref={textInput} placeholder="" required />
                                    <label className='text-clip'>Add a task</label>
                                    <div className="underline"></div>
                                </div>
                                <div className='flex mt-4'>
                                    <div className='time-input-style'>
                                        <input type="time" className='' placeholder="" required />
                                        <Clock className='clock-icon' size={16} weight='bold' />
                                    </div>
                                </div>
                                <button type="submit" className="mt-4 text-neutral-400 font-bold px-2 py-1 ml-2 rounded-full">
                                    <Plus />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <TaskList selectedDate={selectedDate} tasks={tasks} onDeleteTask={handleDeleteTask} checkClearedTaskUpdate={handleClearedTaskUpdate} />
            </div>
        </>
    )
}

export default ToDoAppBar