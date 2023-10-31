import List from './List';
import '../index.css'
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({ selectedDate, tasks, onDeleteTask, checkClearedTaskUpdate }) {
    const selectedDateUTC = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
    const selectedDateString = selectedDateUTC.toISOString().substr(0, 10);

    const handleTaskCheck = (index) => {
        const newTasksCopy = { ...tasks };

        if (newTasksCopy[selectedDateString] && newTasksCopy[selectedDateString][index]) {
            newTasksCopy[selectedDateString][index].isCleared = !newTasksCopy[selectedDateString][index].isCleared;

            if (checkClearedTaskUpdate)
                checkClearedTaskUpdate(newTasksCopy);
        }
    };

    return (
        <div>
            {selectedDate && tasks[selectedDateString] && tasks[selectedDateString].length > 0 && (
                <div className='mt-6'>
                    <ul>
                        {tasks[selectedDateString].map((task, index) => (
                            <List key={index}>
                                <div className={`flex justify-between items-center`}>
                                    <input
                                        type="checkbox"
                                        checked={tasks[selectedDateString][index].isCleared || false}
                                        onClick={() => handleTaskCheck(index)}
                                    />
                                    <span className={`${tasks[selectedDateString][index].isCleared ? 'text-neutral-400 line-through' : ''}`}>
                                        {task.task}
                                    </span>
                                    <button
                                        onClick={() => onDeleteTask(selectedDateString, index)}
                                        className='text-neutral-500'>
                                        <DeleteIcon fontSize="small" />
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
