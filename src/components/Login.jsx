import { useState } from 'react'

const Login = ({
  handleLogin,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const appLogin = async (event) => {
    event.preventDefault()
    await handleLogin({ username, password })
  /*
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(exception)
    }
  */
  }

  return(
    <>
      <h2>Login</h2>
      <form onSubmit={appLogin} className="user-card">
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => {setUsername(target.value)}}
              placeholder="newuser"
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => {setPassword(target.value)}}
              placeholder="s3curep@ssword"
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )}

export default Login