import { InputAdornment, Radio, Grid, Paper, TextField, Button, Chip, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import { Abc, AccessTime } from '@mui/icons-material'

function Page2(props) {
  const handleCommensalProposalChange = (e) => {
    setNewCommensalProposal(e.target.value);
  }

  const handleDeleteChip = (chipToDel) => () => {
    let newArray = props.formValues['commensalproposals'];
    
    let i = newArray.indexOf(chipToDel);

    newArray.splice(i, 1);

    props.setFormValues({
      ...props.formValues,
      commensalproposals: newArray
    })
  }

  const [newCommensalProposal, setNewCommensalProposal] = useState('');

  return (
    <Paper sx={{padding: '20px'}}>

      <Grid container spacing={2}>

        <Grid item xs={12}>
          <h2>Time / Observation Details</h2>
        </Grid>

        <Grid item xs={12}>
          <h4>Known Commensal Proposals</h4>
        </Grid>

        <Grid item xs={6} lg={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                id='newCommensalProposal-input'
                fullWidth
                name='newCommensalProposal'
                label='Proposal Name'
                value={newCommensalProposal}
                onChange={handleCommensalProposalChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Abc/>
                    </InputAdornment>
                  )}}
                />
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' onClick={() => {
                let newArray = props.formValues['commensalproposals'];
                newArray.push(newCommensalProposal); // new array with added commensal proposal
                
                // change commensalproposal array state in master state object 
                props.setFormValues({...props.formValues, commensalproposals: newArray})
                
                setNewCommensalProposal(''); // reset commensal proposal field
              }} >Add</Button>
            </Grid>

          </Grid>
        </Grid>

          {// Makes element for each proposal in commensal proposal array
          }
        <Grid item xs={6} lg={7}>
          <Grid container spacing={2}>
          {props.formValues['commensalproposals'].length > 0 && props.formValues['commensalproposals'].map( (proposal, index) => (
              <Grid item xs="auto">
                <Chip key={index} name={proposal} label={proposal} variant="outlined" onDelete={handleDeleteChip(proposal)}/>
              </Grid>
          ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider variant='middle' />
        </Grid>

        <Grid item xs={21}>
          <h4>Time Details</h4>
        </Grid>

        <Grid item xs={12} lg={4}>
          <FormControl>
            <FormLabel id='requestedtimecategory-label'>Category of Time Requested</FormLabel>
            <RadioGroup id='requestedtimecategory-radio' name='requestedtimecategory'
              value={props.formValues['requestedtimecategory']}
              onChange={props.handleInputChange}
              row={useMediaQuery('(max-width:1200px')}>
              <FormControlLabel value='GT' control={<Radio />} label="GT" />
              <FormControlLabel value='OA' control={<Radio />} label="OA" />
              <FormControlLabel value='Other' control={<Radio />} label="Other" />
            </RadioGroup>
              
          </FormControl>
        </Grid>

        <Grid item xs={6} lg={4}>
          <TextField 
            id='totaltimerequested-input'
            name='totaltimerequested'
            label='Total Time Requested (Hours)'
            fullWidth
            value={props.formValues['totaltimerequested']}
            onChange={props.handleInputChange}
            type='number'
            inputProps={{min: 0, step: 0.1}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime/>
                </InputAdornment>
              )}} />
        </Grid>

        <Grid item xs={6} lg={4}>
          <TextField
            id='sharedtimerequested-input'
            name='sharedtimerequested'
            label='Time That is Commensal (Hours)'
            value={props.formValues['sharedtimerequested']}
            onChange={props.handleInputChange}
            type='number'
            fullWidth
            inputProps={{min: 0, step: 0.1}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime/>
                </InputAdornment>
              )}} />
        </Grid>


        <Grid item xs={12}>
          <Divider variant='middle' />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h4>Frequencies Requested in Proposal</h4>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth 
                multiline
                id='requestedfrequencies-input'
                name='requestedfrequencies'
                value={props.formValues['requestedfrequencies']}
                onChange={props.handleInputChange}
                />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h4>List of Observing Modes Requested in the Proposal</h4>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth 
                multiline
                id='observingmodesrequested-input'
                name='observingmodesrequested'
                value={props.formValues['observingmodesrequested']}
                onChange={props.handleInputChange}
                />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
        <FormControl>
            <FormLabel id='arrayconfig-label'>Array Configuration</FormLabel>
            <RadioGroup id='arrayconfig-radio' name='arrayconfig'
              value={props.formValues['arrayconfig']}
              onChange={props.handleInputChange}
              row={useMediaQuery('(max-width:1200px')}>
              <FormControlLabel value='Compact' control={<Radio />} label="Compact" />
              <FormControlLabel value='Long Baseline' control={<Radio />} label="Long Baseline" />
              <FormControlLabel value='Any' control={<Radio />} label="Any" />
            </RadioGroup>
              
          </FormControl>
        </Grid>

        
        

      </Grid>

    </Paper>
  )
}

export default Page2