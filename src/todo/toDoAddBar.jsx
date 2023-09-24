import { useState } from 'react'
import { format } from 'date-fns'; // Import format from date-fns
import '../index.css'
import TaskList from './taskList';

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

    return (
        <>
            <div className="my-4">
                <h3 className='mt-6 my-6 font-bold text-center'>{format(selectedDate, 'MMMM dd, yyyy')}</h3>
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
                <TaskList selectedDate={selectedDate} tasks={tasks} />
            </div>
        </>
    )
}

export default ToDoAppBar