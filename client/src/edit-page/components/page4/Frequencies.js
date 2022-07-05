import React, { useState } from 'react'
import { Divider, Chip, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material'


function Frequencies(props) {

  const channelSets = {
    GLEAM69: '69:24',
    GLEAM93: '93:24',
    GLEAM121: '121:24',
    GLEAM145: '145:24',
    GLEAM169: '169:24',
    DUAL: '57:68;121:132',
    PAIRS: '62;63;69;70;76;77;84;85;93;94;103;104;113;114;125;126;139;140;153;154;169;170;187;188',
    PICKET:'62;67;73;78;84;89;95;100;106;111;117;122;128;133;139;144;150;155;161;166;172;177;183;188'
  }

  const [open, setOpen] = useState(false)
  const [existingFreqs, setExistingFreqs] = useState({
    GLEAM69: false,
    GLEAM93: false,
    GLEAM121: false,
    GLEAM145: false,
    GLEAM169: false,
    DUAL: false,
    PAIRS: false,
    PICKET: false
  })

  const [centerChannel, setCenterChannel] = useState({
    'channel': '',
    'width': '24',
    'increment': '1'
  })

  const [setOf24, setSetof24] = useState('')
  
  const [editedFreq, setEditedFreq] = useState({
    'type': ''
  })

  const [customSet, setCustomSet] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditedFreq({
      'type': ''
    })
    setExistingFreqs({
      GLEAM69: false,
      GLEAM93: false,
      GLEAM121: false,
      GLEAM145: false,
      GLEAM169: false,
      DUAL: false,
      PAIRS: false,
      PICKET: false
    })
    setCenterChannel({
      'channel': '',
      'width': '24',
      'increment': '1'
    })
  }

  const handleSubmit = () => {
    let proposalFreqs = props.formValues.frequencysets // get array

    if (editedFreq.type === 'Channel Set') {
      for (const [key, value] of Object.entries(existingFreqs)) {
        if (value === true) {
          proposalFreqs.push(channelSets[key]) // add to array
        }
      }
    } else if (editedFreq.type === 'Center Channel') {
      proposalFreqs.push(centerChannel.channel+','+centerChannel.width+','+centerChannel.increment)
    } else if (editedFreq.type === '24 Channel Numbers') {
      proposalFreqs.push(setOf24)
    } else if (editedFreq.type === 'Custom') {
      proposalFreqs.push(customSet)
    }

    props.setFormValues({ // update state with new array
      ...props.formValues,
      'frequencysets': proposalFreqs
    })
    console.log(proposalFreqs)
    handleClose()
  }

  const handleChipDelete = (key) => () => {
    console.log(key)
    let prevFreqs = props.formValues.frequencysets
    prevFreqs.splice(key, 1)

    props.setFormValues({
      ...props.formValues,
      'frequencysets': prevFreqs
    })
  }

  return (
    <div>
      {/** Add Source Btn
       * Open Dialog
       * Freq Channel Type (Pre-existing Channel Sets, Center Channel, 24 Channel Numbers)
       * Adaptive field depending on channel type selection
       * Select from pre-existing channel sets
       * OR
       * Enter center channel - requires function to gen channel set from center channel
       * OR
       * Enter 24 channel numbers
       */}
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <h4>Frequencies</h4>
          </Grid>

          <Grid container spacing={2} sx={{margin: '0px', overflowX: 'scroll'}}>
          {props.formValues.frequencysets.map((data, index) => {
            return (
              <Grid item xs='auto'>
                <Chip label={data} onDelete={handleChipDelete(index)} />
              </Grid>
            )
          })}
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' onClick={handleOpen} >Add Frequency Set</Button>
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Frequencies</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText>Fill in the following information to add a frequency set to your proposal. Click save to commit these changes. Note that channels 105-108 (134-138 MHz) and 
181-215 (230-275 MHz) are badly affected by RFI.</DialogContentText>
                </Grid>

                <Grid item xs={12}>
                  <TextField label='Channel Set Type' fullWidth select value={editedFreq['type']} onChange={(e) => (setEditedFreq({...editedFreq, 'type': e.target.value}))}>
                    <MenuItem value='Channel Set' >Existing Channel Set</MenuItem>
                    <MenuItem value='Center Channel' >Center Channel</MenuItem>
                    <MenuItem value='24 Channel Numbers' >24 Channel Numbers</MenuItem>
                    <MenuItem value='Custom' >Custom</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Divider variant='middle' />
                </Grid>

                <Grid item xs={12}>
                  {editedFreq.type === 'Channel Set' ? 
                    <FormGroup>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <FormControlLabel control={<Checkbox checked={existingFreqs.GLEAM69} onChange={(e) => (setExistingFreqs({...existingFreqs, 'GLEAM69': e.target.checked}))}/>} label='GLEAM 69' />
                          <FormControlLabel control={<Checkbox checked={existingFreqs.GLEAM93} onChange={(e) => (setExistingFreqs({...existingFreqs, 'GLEAM93': e.target.checked}))}/>} label='GLEAM 93' />
                          <FormControlLabel control={<Checkbox checked={existingFreqs.GLEAM121} onChange={(e) => (setExistingFreqs({...existingFreqs, 'GLEAM121': e.target.checked}))}/>} label='GLEAM 121' />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel control={<Checkbox checked={existingFreqs.GLEAM145} onChange={(e) => (setExistingFreqs({...existingFreqs, 'GLEAM145': e.target.checked}))}/>} label='GLEAM 145' />
                          <FormControlLabel control={<Checkbox checked={existingFreqs.GLEAM169} onChange={(e) => (setExistingFreqs({...existingFreqs, 'GLEAM169': e.target.checked}))}/>} label='GLEAM 169' />
                          <FormControlLabel control={<Checkbox checked={existingFreqs.DUAL} onChange={(e) => (setExistingFreqs({...existingFreqs, 'DUAL': e.target.checked}))}/>} label='DUAL' />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel control={<Checkbox checked={existingFreqs.PAIRS} onChange={(e) => (setExistingFreqs({...existingFreqs, 'PAIRS': e.target.checked}))}/>} label='PAIRS' />
                          <FormControlLabel control={<Checkbox checked={existingFreqs.PICKET} onChange={(e) => (setExistingFreqs({...existingFreqs, 'PICKET': e.target.checked}))}/>} label='PICKET' />
                        </Grid>
                      </Grid>
                    </FormGroup>
                  : ''}
                

                  {editedFreq.type === 'Center Channel' ?
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField 
                        label='Channel'
                        value={centerChannel.channel}
                        onChange={(e)=>{setCenterChannel({...centerChannel, 'channel': e.target.value})}}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                        label='Width'
                        value={centerChannel.width}
                        onChange={(e)=>{setCenterChannel({...centerChannel, 'width': e.target.value})}}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                        label='Increment'
                        value={centerChannel.increment}
                        onChange={(e)=>{setCenterChannel({...centerChannel, 'increment': e.target.value})}}
                      />
                    </Grid>
                  </Grid>

                  : ''}

                  {editedFreq.type === '24 Channel Numbers' ?
                   <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DialogContentText>Enter 24 channel numbers separated by semi-colons in the field below.</DialogContentText>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label='Custom Set of 24 Channels' placeholder='channel1;channel2;channel3...channel24' value={setOf24} onChange={(e)=>{setSetof24(e.target.value)}} />
                      </Grid>
                  </Grid> 
                  : ''}

                  {editedFreq.type === 'Custom' ? 
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DialogContentText>Enter your custom channel set in the field below. Custom channel sets can be specified as followed:
                        <br/><br/>&lt;channel&gt;
                        <br/>&lt;center&gt;,&lt;width&gt;,&lt;increment&gt;
                        <br/>&lt;start&gt;:&lt;stop&gt;:&lt;increment&gt;
                      </DialogContentText>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='Custom Channel Set' value={customSet} onChange={(e)=>{setCustomSet(e.target.value)}} />
                    </Grid>
                  </Grid>
                  : ''}

                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>          

        </Grid>
    </div>
  )
}

export default Frequencies