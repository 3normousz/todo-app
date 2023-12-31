import "../index.css"

function List(props) {
    return (
        <>
            <li className="max-w-xl break-words mt-4 px-4 pt-4 py-4 border shadow-lg text-white">{props.children}</li>
        </>
    )
}

export default List