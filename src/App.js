import React from "react"
import './App.css';
import ListItem from "./ListItems"

// App
function App() {

    const [addNote, setAddNote] = React.useState([])
    const [flag, setFlag] = React.useState(false);
    const [noteItem, setNoteItem] = React.useState("")

    React.useEffect(() => {
        fetch("http://localhost:8000/notes")
            .then((response) => {
                return response.json()
            })
            .then((data) => setAddNote(data))
    }, [flag])

    // Adding Pagination 
    const [currentPage, setCurrentPage] = React.useState(1)
    const itemsPerPage = 3
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let currentItems = addNote.slice(startIndex, endIndex)
    const totalPages = Math.ceil(addNote.length / itemsPerPage)



    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }


    if (currentItems.length === 0) {
        handlePreviousPage()
    }


    // Copying input text value as note Item
    function handleNoteItem(event) {
        setNoteItem(event.target.value)
    }
    // Upon button click, adding new note item to items list db

    function handleAddNote() {
        const newNote = {
            id: Math.ceil(Math.random() * 100),
            item: noteItem,
            done: false
        }
        fetch("http://localhost:8000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote)
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => setFlag((flag) => flag = !flag))
        setNoteItem("")
    }

    function handleDone(id) {

        let doneNote
        for (var i = 0; i < addNote.length; i++) {
            if (addNote[i].id === id) {
                doneNote = addNote[i]
            }
        }
        doneNote = { ...doneNote, done: !doneNote.done }

        fetch("http://localhost:8000/notes/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doneNote)
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => setFlag((flag) => flag = !flag))




    }

    function deleteNote(id) {

        fetch("http://localhost:8000/notes/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => {
                return response.json()
            })
            .then((data) => setFlag((flag) => flag = !flag))
    }
    return (
        <div className="App">
            <header className="App-header">
                Notes
            </header>
            <section>
                <input className="noteInput" type="text" maxLength={50} value={noteItem} onChange={handleNoteItem} />
                <button className="noteAddButton" onClick={handleAddNote} >Add Note</button>
            </section>
            <h3 style={{ color: 'red' }}>Displaying notes from page {totalPages === 0 ? 0 : currentPage}</h3>
            <section>
                <ListItem addNote={currentItems} onClick={deleteNote} handleDone={handleDone} />
            </section>

            <button onClick={handlePreviousPage}>Previous</button>
            <span className="totalPages">--Total Page:{totalPages}--</span>
            <button onClick={handleNextPage}>Next</button>
        </div>
    );
}

export default App;
