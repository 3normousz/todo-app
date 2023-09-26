import List from './List';
import '../index.css'

function TaskList({ selectedDate, tasks }) {

    const selectedDateUTC = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));

    const selectedDateString = selectedDateUTC.toISOString().substr(0, 10);

    return (
        <>
            <div>
                {selectedDate && tasks[selectedDateString] && (
                    <div className='mt-6'>
                        <ul>
                            {Array.from({ length: tasks[selectedDateString].length }).map((_, index) => {
                                return <List key={index}>{tasks[selectedDateString][index]}</List>;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskList;
