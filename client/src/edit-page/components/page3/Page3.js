import React from 'react'
import { Button, Grid, Paper } from '@mui/material'

function Page3(props) {

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const formDataWithFile = {
      ...props.formValues,
      descriptionfile: file
    }

    props.setFormValues(formDataWithFile)
    console.log(props.formValues.descriptionfile)

  }

  return (
    <Paper sx={{padding: '20px'}}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <h2>Project Description File</h2>
        </Grid>

        <Grid item xs={12}>
          <h4 style={{fontWeight: '200'}}>Some file description and instructions should go here with other information about this section. tbd</h4>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            id="descriptionfile-button"
            variant="contained"
            component="label"
          >
            Upload File
            <input 
              type="file"
              hidden
              id='descriptionfile-input'
              name='descriptionfile'
              onChange={handleUpload}
            />
          </Button>
        </Grid>


      </Grid>
    </Paper>
  )
}

export default Page3