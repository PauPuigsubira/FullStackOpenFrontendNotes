import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import Login from './components/Login'
import NoteForm from './components/NoteForm'
import UserCard from './components/UserCard'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'

import './styles/index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  //const [loginVisible, setLoginVisible] = useState(false)
  /*
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <Login
            handleLogin = {handleLogin}
            username = {username}
            setUsername = {setUsername}
            password = {password}
            setPassword = {setPassword}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
*/
  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
    //setUsername('')
    //setPassword('')
  }
  /*
  const handleNoteChange = event => {
    setNewNote(event.target.value)
  }
*/
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  /*
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )
*/
  //console.log('localstorage user:', window.localStorage.loggedNoteappUser)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {
        user === null
          ?
          //loginForm()
          <Togglable buttonLabel='login'>
            <Login
              handleLogin = {handleLogin}
              //username = {username}
              //handleUsernameChange = {({ target }) => setUsername(target.value)}
              //password = {password}
              //handlePasswordChange = {({ target }) => setPassword(target.value)}
            />
          </Togglable>
          :
          <div>
            <UserCard
              user = {user}
              handleLogout = {handleLogout}
            />
            <Togglable buttonLabel='new note' ref={noteFormRef}>
              <NoteForm
              //addNote = {addNote}
              //newNote = {newNote}
              //handleNoteChange = {handleNoteChange}
                createNote={addNote}
              />
            </Togglable>
          </div>
      }

      {
        //user === null && loginForm()
      }
      {
        //user !== null && noteForm()
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      {
        /*
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
      */
      }

      <Footer />
    </div>
  )
}

export default App