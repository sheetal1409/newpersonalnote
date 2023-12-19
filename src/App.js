import React from "react"
import './App.css';
import notes from "./data";
import ListItem from "./ListItems"

function App() {
  const [addNote, setAddNote] = React.useState(notes)
  const [noteItem, setNoteItem] = React.useState("")
  const [itemNullNote, setItemNullNote] = React.useState(false)

  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 3

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = addNote.slice(startIndex, endIndex)

  const totalPages = Math.ceil(addNote.length / itemsPerPage)
  function handleNoteItem(event) {
    setNoteItem(event.target.value)
  }
  function handleAddNote() {
    if (noteItem === "") {
      setItemNullNote(true)
    }
    else {
      setAddNote(addNote => {
        return [...addNote, noteItem]
      })
      setNoteItem("")
      setItemNullNote(false)
    }

  }



  function deleteNote(index) {
    const updateNote = [...addNote.slice(0, index), ...addNote.slice(index + 1)]
    setAddNote(updateNote)
  }

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
  return (
    <div className="App">
      <header className="App-header">
        Notes
      </header>
      <section>
        <input className="noteInput" type="text" placeholder={itemNullNote ? 'Enter Item to add' : 'Add notes...'} maxLength={50} value={noteItem} onChange={handleNoteItem} />
        <button className="noteAddButton" onClick={handleAddNote} >Add Note</button>
      </section>
      <h3>Displaying notes from page {currentPage}</h3>
      <section>
        <ListItem addNote={currentItems} onClick={deleteNote} />
      </section>

      <button onClick={handlePreviousPage}>Previous</button>
      <span className="totalPages">--Total Page:{totalPages}--</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default App;
