import { useState } from 'react';
import List from './List';
import '../index.css'

function TaskList({ selectedDate, tasks, onDeleteTask }) {
    const selectedDateUTC = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
    const selectedDateString = selectedDateUTC.toISOString().substr(0, 10);

    // Create a state variable to track the checked state of each task
    const [taskCheckStates, setTaskCheckStates] = useState({});

    const handleTaskCheck = (index) => {
        // Toggle the checked state for the task at the given index
        setTaskCheckStates((prevCheckStates) => ({
            ...prevCheckStates,
            [index]: !prevCheckStates[index],
        }));
    };

    // NOTE -> <input type="checkbox" onClick={() => onDeleteTask(selectedDateString, index)} />
    return (
        <div>
            {selectedDate && tasks[selectedDateString] && tasks[selectedDateString].length > 0 && (
                <div className='mt-6'>
                    <ul>
                        {tasks[selectedDateString].map((task, index) => (
                            <List key={index}>
                                <div className={`flex justify-between items-center`}>
                                    <input type="checkbox" checked={taskCheckStates[index] || false} onClick={() => handleTaskCheck(index)} />
                                    <span className={`${taskCheckStates[index] ? 'text-neutral-400 line-through' : ''}`}>
                                        {task}
                                    </span>

                                    <button onClick={() => onDeleteTask(selectedDateString, index)}
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                                        Remove
                                    </button>
                                </div>
                            </List>
                        ))}
                    </ul>
                </div>
            )
            }
        </div >
    )
}

export default TaskList;
