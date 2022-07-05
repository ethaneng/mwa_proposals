import { Radio, FormControlLabel, Divider, FormControl, FormLabel, Grid, InputAdornment, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import { Abc, Email } from '@mui/icons-material'
import { Paper } from '@mui/material'
import ProposalMembers from './ProposalMembers'
import { useMediaQuery } from '@mui/material'

function Page1(props) {
  return (
    <div>
      <Paper sx={{
        padding: '20px'
      }}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <h2>Team Summary / Information</h2>
          </Grid>

          <Grid item xs={12} xl={8}>
            <TextField 
              id="proposaltitle-input" 
              name='proposaltitle'
              label="Title of Proposal"
              type="text"
              value={props.formValues['proposaltitle']}
              onChange={props.handleInputChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Abc/>
                  </InputAdornment>
                )}}/>
          </Grid>

          <Grid item xs={12} xl={4}>
            <TextField 
              id="contactemail-input" 
              name='contactemail'
              label="Contact Email"
              type="email"
              value={props.formValues['contactemail']}
              onChange={props.handleInputChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )}}
              />
          </Grid>

          <Grid item xs={12}>
            <Divider variant='middle' />
          </Grid>

          <Grid item xs={12}>
              <ProposalMembers formValues={props.formValues} setFormValues={props.setFormValues} array={props.formValues['proposalmembers']} />
          </Grid>

          <Grid item xs={12}>
            <Divider variant='middle'/>
          </Grid>

          <Grid item xs={12} lg={4}>
            <FormControl>
              <FormLabel id='areasofscience-label'>Areas of MWA Science</FormLabel>
              <RadioGroup 
                id='areasofscience-radio'
                name='areasofscience'
                value={props.formValues['areasofscience']}
                onChange={props.handleInputChange}
                row={useMediaQuery('(max-width:1200px')}>

                <FormControlLabel value="EoR" control={<Radio />} label="EoR" />
                <FormControlLabel value="GEG" control={<Radio />} label="GEG" />
                <FormControlLabel value="Transients" control={<Radio />} label="Transients" />
                <FormControlLabel value="SHI" control={<Radio />} label="SHI" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={4}>
            <FormControl>
              <FormLabel id='iscontinuation-label'>Is This a Continuation of a Previous Proposal?</FormLabel>
              <RadioGroup 
                id='iscontinuation-radio'
                name='iscontinuation'
                value={props.formValues['iscontinuation']}
                onChange={props.handleInputChange}
                row={useMediaQuery('(max-width:1200px')}>

                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={4}>
            <FormControl>
              <FormLabel id='islargeproposal-label'>Is This a Large Proposal?</FormLabel>
              <RadioGroup 
                id='islargeproposal-radio'
                name='islargeproposal'
                value={props.formValues['islargeproposal']}
                onChange={props.handleInputChange}
                row={useMediaQuery('(max-width:1200px')}>

                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider variant='middle' />
          </Grid>

          <Grid item xs={12}>
            <h4>How interruptible is this proposal in the event of an override for transient science?</h4>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='proposalinterruptibility-input'
              name='proposalinterruptibility'
              multiline
              fullWidth
              value={props.formValues['proposalinterruptibility']}
              onChange={props.handleInputChange}
              />
          </Grid>

          <Grid item xs={12}>
            <h4>Proposal Abstract</h4>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='proposalabstract-input'
              name='proposalabstract'
              multiline
              fullWidth
              value={props.formValues['proposalabstract']}
              onChange={props.handleInputChange}
              />
          </Grid>

        </Grid>
      </Paper>
    </div>
  )
}

export default Page1