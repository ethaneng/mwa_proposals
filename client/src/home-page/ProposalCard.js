import { IconButton, Paper } from '@mui/material'
import React from 'react'
import { Delete, Edit } from '@mui/icons-material'

function ProposalCard(props) {

    function editProposal(proposal) {
        props.setFormValues(proposal)
        props.setPage('edit')
    }

    async function deleteProposal(id) {
        try {
            // Call endpoint to delete proposals and s3 file
            let response = await fetch(`http://localhost:5000/delete_proposal/${id}`)
            let json = await response.json()
            console.log(response)

            // update state to not show deleted proposal anymore
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <Paper elevation={4} sx={{padding: '15px', height: '150px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>{props.data.proposaltitle}</h2>
                <div>
                    <IconButton onClick={()=> deleteProposal(props.data.p_id)}><Delete sx={{color: '#cd0c0c'}}/></IconButton>
                    <IconButton onClick={() => editProposal(props.data)}><Edit sx={{color: '#1976d2'}}/></IconButton>
                </div>
            </div>
            <p style={{overflowY: 'hidden', height: '35px'}}>{props.data.proposalabstract}</p>
        </Paper>
    </div>
  )
}

export default ProposalCard