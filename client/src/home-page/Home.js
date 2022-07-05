import { Paper, Grid } from '@mui/material'
import React from 'react'
import ProposalCard from './ProposalCard'
import NewProposal from './NewProposal'

function Home(props) {
  // props: proposals Array[obj] where each obj is the json object for a proposal
  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
      <Paper elevation={3} sx={{width: '1600px', height: '700px', padding: '25px'}}>
        <h2>My Proposals</h2>
        <Grid container spacing={2} sx={{marginTop: '25px'}}>
          <Grid item xs={4}>
            <NewProposal defaultValues={props.defaultValues} setFormValues={props.setFormValues} setPage={props.setPage} />
          </Grid>
          {props.proposals.map((proposal, index) => {
            return <Grid item xs={4}> <ProposalCard data={proposal} key={proposal.p_id} setFormValues={props.setFormValues} setPage={props.setPage} userId={props.userId} setUser={props.setUser} /> </Grid>
          })}
        </Grid>
      </Paper>
    </div>
  )
}

export default Home