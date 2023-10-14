import List from './List';
import '../index.css'

function TaskList({ selectedDate, tasks, onDeleteTask }) {
    const selectedDateUTC = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
    const selectedDateString = selectedDateUTC.toISOString().substr(0, 10);

    return (
        <div>
            {selectedDate && tasks[selectedDateString] && tasks[selectedDateString].length > 0 && (
                <div className='mt-6'>
                    <ul>
                        {tasks[selectedDateString].map((task, index) => (
                            <List key={index}>
                                <div className='flex justify-between items-center'>
                                    {task}
                                    <input type="checkbox" onClick={() => onDeleteTask(selectedDateString, index)} />
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
