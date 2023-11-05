import List from './List';
import '../index.css'

import { TrashSimple } from '@phosphor-icons/react';

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
                                <div className={`flex items-center justify-between`}> {/* Added 'justify-between' for spacing */}
                                    <div className={`flex items-center`}>
                                        <input
                                            type="checkbox"
                                            checked={tasks[selectedDateString][index].isCleared || false}
                                            onClick={() => handleTaskCheck(index)}
                                        />
                                        <div className={`${tasks[selectedDateString][index].isCleared ? 'text-neutral-400 line-through' : ''} ml-4 break-all`}>
                                            <span>
                                                {task.task}
                                            </span>
                                            <span className='mt-2 text-neutral-300 block'>
                                                {task.time !== '' ? task.time : 'No time specified'} {/* Unicode for non-breaking spaces */}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onDeleteTask(selectedDateString, index)}
                                        className='text-neutral-500 ml-2'>
                                        <TrashSimple color='white' size={16} />
                                    </button>
                                </div>
                            </List>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default TaskList;
