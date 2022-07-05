import React from 'react'
import Header from './Header'

function LoggedOutContent(props) {
  return (
    <div>
      <Header loggedIn={props.loggedIn} handleLogInClick={props.handleLogInClick} handleLogOutClick={props.handleLogOutClick} />
      loggedOutContent
    </div>
  )
}

export default LoggedOutContent