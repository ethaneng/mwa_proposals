import React from 'react'
import { InputAdornment, Paper, Grid, TextField, Divider} from '@mui/material'
import { Abc } from '@mui/icons-material'
import Sources from './Sources'
import Frequencies from './Frequencies'

function Page4(props) {

  return (
    <Paper sx={{padding: '20px'}}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <h2>Technical Requirements and Data Management</h2>
        </Grid>

        <Grid item xs={12}>
          <TextField 
          id='calibratorfields-input'
          name='calibratorfields'
          label='MWA Calibration Field'
          value={props.formValues['calibratorfields']}
          onChange={props.handleInputChange}
          sx={{color: 'green'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Abc/>
              </InputAdornment>
            )}} />
        </Grid>

        <Grid item xs={12}>
          <Divider variant='middle' />
        </Grid>

        <Grid item xs={12}>
          <Sources formValues={props.formValues} setFormValues={props.setFormValues} />
        </Grid>

        <Grid item xs={12}>
          <Frequencies formValues={props.formValues} setFormValues={props.setFormValues} />
        </Grid>

      </Grid>
    </Paper>
  )
}

export default Page4