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
      const newNote = {
        id: addNote.length + 1,
        item: noteItem,
        done: false
      }
      setAddNote([...addNote, newNote])
      setNoteItem("")
      setItemNullNote(false)

    }

  }
  // React.useEffect(function () {
  //   console.log(addNote)
  // }, [addNote])



  function deleteNote(id) {
    // id is index 
    if (currentPage > 1) {
      id = id + ((currentPage - 1) * itemsPerPage)
    }


    setAddNote(prevNotes => {
      return [...prevNotes.slice(0, id), ...prevNotes.slice(id + 1)]
    })
  }


  function handleDone(id) {

    let doneNote = [...addNote]
    if (currentPage > 1) {
      id = id + ((currentPage - 1) * itemsPerPage)
    }


    for (var i = 0; i < doneNote.length; i++) {
      if (i === id) {
        doneNote[i].done = true
        break
      }
    }

    setAddNote([...doneNote])


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
      <h3 style={{ color: 'red' }}>Displaying notes from page {currentPage}</h3>
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
