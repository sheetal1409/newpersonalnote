import React from "react"


export default function ListItem(props) {
    const notes = props.addNote.length
    const baseColor = "#ece8df"
    const [iconColors, setIconColors] = React.useState(Array.from(notes).fill(baseColor));


    function handleDelete(index) {
        props.onClick(index)

    }
    function checkList(index) {
        const updatedColors = [...iconColors];

        updatedColors[index] = "#98bda3"
        setIconColors(updatedColors);
    }
    return (
        <ul>
            {
                props.addNote.map((item, index) => <li key={index}>

                    <div className="listItem" key={index}  >

                        <span className="itemsNote">{item}</span>
                        <i className="fa-solid fa-circle-check" style={{ color: iconColors[index], cursor: 'pointer' }} onClick={() => checkList(index)}></i>
                        <i className="fa-solid fa-circle-minus" style={{ color: "#ece8df" }} onClick={() => handleDelete(index)} > </i>

                    </div></li>)
            }
        </ul >
    )
}

