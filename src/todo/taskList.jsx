import { format } from 'date-fns'; // Import format from date-fns
import '../index.css'

function TaskList({ selectedDate, tasks }) {

    console.log(tasks);
    return (
        <>
            <div>
                {selectedDate && tasks[selectedDate.toISOString().substr(0, 10)] && (
                    <div className='mt-4'>
                        <ul>
                            {tasks[selectedDate.toISOString().substr(0, 10)].map((task, index) => (
                                <li key={index}>{task}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskList