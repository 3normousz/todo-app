import "../index.css"
function List(props) {
    console.log(props);
    return (
        <>
            <li className="mt-4 px-4 pt-4 py-4 border shadow-lg">{props.children}</li>
        </>
    )
}

export default List