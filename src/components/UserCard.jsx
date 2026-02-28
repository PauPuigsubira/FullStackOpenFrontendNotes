const UserCard = ({ user, handleLogout }) => {
  return (
    <section className="user-card">
      <p>{user.name} logged-in</p>
      <button
        onClick={handleLogout}
      >
        Loggout
      </button>
    </section>
  )
}

export default UserCard