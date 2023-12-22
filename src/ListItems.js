import React from "react"


export default function ListItem(props) {
    // const notes = props.addNote.length

    const baseColor = "#ece8df"
    // const [iconColors, setIconColors] = React.useState(Array.from(notes).fill(baseColor));
    const doneColor = "#98bda3"
    function handleDelete(index) {
        props.onClick(index)
    }
    function checkList(index) {

        props.handleDone(index)
        // const updatedColors = [...iconColors];

        // updatedColors[id] = "#98bda3"
        // setIconColors(updatedColors);

    }
    return (
        <ul>
            {
                props.addNote.map((item, index) => <li key={index}>

                    <div className="listItem" key={index}  >

                        <span className="itemsNote">{item.item}</span>
                        <i className="fa-solid fa-circle-check" style={{ color: item.done ? doneColor : baseColor, cursor: 'pointer' }} onClick={() => checkList(index)}></i>
                        <i className="fa-solid fa-circle-minus" style={{ color: "#ece8df" }} onClick={() => handleDelete(index)} > </i>

                    </div></li>)
            }
        </ul >
    )
}

