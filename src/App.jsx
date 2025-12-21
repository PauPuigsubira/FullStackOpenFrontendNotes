import { useState, useEffect } from 'react'

import Note from './components/Note'

import serviceNotes from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState('')

  const setImportant = (id) => {
    console.log('setImportant', id)
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, important: !note.important } : note
    )
    setNotes(updatedNotes)
  }

  const writeNote = (event) => {
    setNote(event.target.value)
  }

  const handleNewNote = (event) => {
    event.preventDefault()
    const newNote = { 
      content: note,
      important: Math.random() < 0.5,
    }

    serviceNotes
      .post(newNote)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNote('')
      })
  }

  useEffect(() => {
    const fetchNotes = serviceNotes.get()
    // Set Notes
    fetchNotes.then((data) => {
      setNotes(data)
    })

  },[])

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            setImportant={setImportant}
          />
        ))}
      </ul>
      <form onSubmit={handleNewNote}>
        <input
          type='text'
          placeholder='New note text...'
          onChange={writeNote}
          value={note}
        />
        <button type='submit'>Add New Note</button>
      </form>
    </div>
  )
}

export default App
