import { useState } from 'react'
//import noteService from '../services/notes'

//const NoteForm = ({handleNewData}) => {
const NoteForm = ({createNote}) => {
    const [newNote, setNewNote] = useState('')

  const addNote = event => {
    event.preventDefault()
  
    const noteObject = {
      content: newNote,
      important: true
    }
  /*
    noteService.create(noteObject).then(() => {
      noteService.getAll().then(initialNotes => {
        handleNewData(initialNotes)
      })
      setNewNote('')
    })
  */
    createNote(noteObject)
    setNewNote('')
  }
  
  return (
  <section>
    <h2>Create a New Note</h2>

    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={({target}) => {setNewNote(target.value)}}
      />
      <button type="submit">save</button>
    </form>  
  </section>
)
}

export default NoteForm