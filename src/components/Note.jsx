const ButtonImportant = ({note, setImportant}) => {
  const label = note.important ? 'Make Not Important' : 'Make Important'
  
  return (
    <button
      onClick={() => setImportant(note.id)}
    >
      {label}
    </button>
  )
}

const Note = ({ note, setImportant }) => {

  return (
  <li>
    {note.content}
    <ButtonImportant
      note={note}
      setImportant={setImportant}
    />
  </li>
  )
}

export default Note
