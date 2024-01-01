import React from "react"


export default function ListItem(props) {
    const baseColor = "#ece8df"
    const doneColor = "#98bda3"
    function handleDelete(index) {
        props.onClick(index)
    }
    function checkList(index) {

        props.handleDone(index)

    }
    return (
        <ul>
            {
                props.addNote.map((item, index) => <li key={index}>

                    <div className="listItem" key={item.id}  >

                        <span className="itemsNote">{item.item}</span>
                        <i className="fa-solid fa-circle-check" style={{ color: item.done ? doneColor : baseColor, cursor: 'pointer' }} onClick={() => checkList(item.id)}></i>
                        <i className="fa-solid fa-circle-minus" style={{ color: "#ece8df" }} onClick={() => handleDelete(item.id)} > </i>

                    </div></li>)
            }
        </ul >
    )
}

