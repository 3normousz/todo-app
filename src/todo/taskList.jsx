import List from './List';
import '../index.css'

function TaskList({ selectedDate, tasks }) {

    return (
        <>
            <div>
                {selectedDate && tasks[selectedDate.toISOString().substr(0, 10)] && (
                    <div className='mt-4'>
                        <ul>
                            {Array.from({ length: tasks[selectedDate.toISOString().substr(0, 10)].length }).map((_, index) => {
                                return <List key={index}>{tasks[selectedDate.toISOString().substr(0, 10)][index]}</List>;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskList