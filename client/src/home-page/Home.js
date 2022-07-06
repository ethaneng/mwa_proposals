import { Paper, Grid, IconButton } from '@mui/material'
import React from 'react'
import ProposalCard from './ProposalCard'
import NewProposal from './NewProposal'
import { Refresh } from '@mui/icons-material'

function Home(props) {
  
  async function refreshProposals() {
    // get proposals for logged in user
    const response = await fetch(`http://localhost:5000/get_proposals?user=${props.userId}`)
    if (!response.ok) {
      throw new Error('Couldnt gather proposals from database for logged in user')
    }
    const data = await response.json()
    props.setUserProposals(data)
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
      <Paper elevation={3} sx={{width: '1600px', height: '700px', padding: '25px'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h2>My Proposals</h2>
          <IconButton onClick={refreshProposals} >
            <Refresh />
          </IconButton>
        </div>
        <Grid container spacing={2} sx={{marginTop: '25px'}}>
          <Grid item xs={4}>
            <NewProposal defaultValues={props.defaultValues} setFormValues={props.setFormValues} setPage={props.setPage} />
          </Grid>
          {props.proposals.map((proposal, index) => {
            return <Grid item xs={4}> <ProposalCard data={proposal} key={proposal.p_id} refreshProposals={refreshProposals} setFormValues={props.setFormValues} setPage={props.setPage} userId={props.userId} setUser={props.setUser} /> </Grid>
          })}
        </Grid>
      </Paper>
    </div>
  )
}

export default Home