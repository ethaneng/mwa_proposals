import React from 'react'
import { Paper } from '@mui/material'

function NewProposal(props) {

    function createNewProposal() {
        props.setFormValues(props.defaultValues)
        props.setPage('edit')
    }

  return (
    <div>
        <Paper onClick={createNewProposal}elevation={4} sx={{padding: '15px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
            <h2>Create New Proposal</h2>
        </Paper>
    </div>
  )
}

export default NewProposal