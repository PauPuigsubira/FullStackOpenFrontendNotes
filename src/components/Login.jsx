const Login = ({
  handleLogin, 
  username, 
  setUsername, 
  password, 
  setPassword
}) => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="user-card">
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
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
              onChange={({ target }) => setPassword(target.value)}
              placeholder="s3curep@ssword"
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

export default Login