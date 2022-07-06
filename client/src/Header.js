import React from 'react'
import { Button } from '@mui/material'

function Header(props) {
  return (
    <div style={{width:'100%', height: '100px', backgroundColor: '#282C55', color: 'white'}}>
        <div style={{width:'80%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 'auto'}}>
            <h1>MWA Logo</h1>
            <p>logged in with user ID {props.userId}</p>
            <div style={{display:'flex', alignItems: 'center', width: '250px', justifyContent: props.loggedIn ? 'space-between' : 'flex-end'}}>
                {props.loggedIn ? <h2 onClick={() => props.setPage('home')} style={{cursor: 'pointer'}} >Dashboard</h2> : ''}
                {props.loggedIn ? <Button variant='outlined' onClick={props.handleLogOutClick}>Logout</Button> : <Button style={{float: 'right'}}variant='contained' onClick={props.handleLogInClick}>Login</Button>}
            </div>
        </div>
    </div>
  )
}

export default Header