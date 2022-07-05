import { React, useState } from 'react'
import LoggedInContent from './LoggedInContent'
import LoggedOutContent from './LoggedOutContent'

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState()

    function handleLogInClick(e) {
        setLoggedIn(true)
        // handle user log in and return their userid
        setUser(2)
    }
    function handleLogOutClick(e) {
        setLoggedIn(false)
        setUser()
    }

  return (
    <div>
        {loggedIn ? <LoggedInContent userId={user} setUser={setUser} loggedIn={loggedIn} handleLogInClick={handleLogInClick} handleLogOutClick={handleLogOutClick} /> : <LoggedOutContent loggedIn={loggedIn} handleLogInClick={handleLogInClick} handleLogOutClick={handleLogOutClick} />}
    </div>
  )
}
export default App