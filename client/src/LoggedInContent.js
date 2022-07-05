import React from 'react'
import  { useEffect, useState } from 'react'
import Home from './home-page/Home'
import Proposal from './edit-page/Proposal'
import Header from './Header'

function LoggedInContent(props) {
  const defaultValues = {
    proposaltitle: '',
    contactemail: '',
    proposalmembers: [],
    areasofscience: '',
    requestedtimecategory: '',
    totaltimerequested: 0.00,
    islargeproposal: '',
    sharedtimerequested: 0.00,
    commensalproposals: [],
    arrayconfig: '',
    requestedfrequencies: '',
    observingmodesrequested: '',
    iscontinuation: '',
    proposalinterruptibility: '',
    proposalabstract: '',
    descriptionfile: '',
    calibratorfields: '',
    sources: [],
    frequencysets: [],
    u_id: props.userId
  }
  
  const [loading, setLoading] = useState(true)
  const [userProposals, setUserProposals] = useState([])
  const [page, setPage] = useState('home')
  const [formValues, setFormValues] = useState(defaultValues);


  
  useEffect(() => {
    async function getProposals() {
      // get proposals for logged in user
      const response = await fetch(`http://localhost:5000/get_proposals?user=${props.userId}`)
      if (!response.ok) {
        throw new Error('Couldnt gather proposals from database for logged in user')
      }
      const data = await response.json()
      setUserProposals(data)
    }
    getProposals()
    setLoading(false)
  }, [props.userId])

  return (
    <div>
      <Header loggedIn={props.loggedIn} handleLogInClick={props.handleLogInClick} handleLogOutClick={props.handleLogOutClick} setPage={setPage}/>
      {page === 'home' ? <Home proposals={userProposals} defaultValues={defaultValues} setPage={setPage} setFormValues={setFormValues} userProposals={userProposals} userId={props.userId} setUser={props.setUser}/> : ''}
      {page === 'edit' ? <Proposal formValues={formValues} setFormValues={setFormValues}/> : ''}
    </div>
  )
}

export default LoggedInContent