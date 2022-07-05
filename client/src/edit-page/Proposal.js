import React, { useState } from 'react';
import Page1 from './components/page1/Page1';
import Page2 from './components/page2/Page2';
import Page3 from './components/page3/Page3';
import Page4 from './components/page4/Page4';
import Page5 from './components/page5/Page5';
import PageTitles from './components/PageTitles';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ArrowBackIosNew, } from '@mui/icons-material';

function Proposal(props) {
  
  // vars
  // steps displayed on sidebar of proposal
  const steps = [
    {
      label: 'Team Summary / Proposal Abtract',
      description: 'This section includes information about the members of the your Proposal Team, contact information, and abstract details about your Proposal itself. '
    },
    {
      label: 'Time / Observation Details',
      description: 'This section includes information about the amount of time requested, any commensal proposals, and details about the observation modes and frequencies requested.'
    },
    {
      label: 'Project Description File',
      description: 'This section includes information about the scientific justification of your Proposal and why the MWA\'s capabilities are essential for your given science.'
    },
    {
      label: 'Technical Requirements and Data Mangement',
      description: 'This section includes information about the sources observed for your Proposal, and the required calibration settings for the MWA.'
    },
    {
      label: 'Review',
      description: 'Review the information you have submitted.'
    }
  ]
  
  const numPages = steps.length;
  
  // Show relevant form on right side when page state updates
  const showFormPage = (page) => {
      if (page === 0) {
          return <Page1 formValues={props.formValues} handleInputChange={handleInputChange} setFormValues={props.setFormValues}/>;
      } else if (page === 1) {
          return <Page2 formValues={props.formValues} handleInputChange={handleInputChange} setFormValues={props.setFormValues}/>;
      } else if (page === 2) {
          return <Page3 formValues={props.formValues} handleInputChange={handleInputChange} setFormValues={props.setFormValues}/>;
      } else if (page === 3) {
          return <Page4 formValues={props.formValues} handleInputChange={handleInputChange} setFormValues={props.setFormValues}/>;
      } else if (page === 4) {
          return <Page5 formValues={props.formValues} handleInputChange={handleInputChange} setFormValues={props.setFormValues}/>;
      }
  }

  // state 
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  // Function to auto update state in formValues
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    props.setFormValues({
      ...props.formValues,
      [name]: value,
    });
  };

  // sets the page to the pagetitle that was clicked in the left sidebar
  const handlePageClick = (page) => () => {
    setPage(page)
  }
  
  // closes the popup
  const handleClose = () => {
    setOpen(false)
  }
  
  // interprets formValues from file
  const handleImport = (e) => {
    // reads stringified formvalues object from file and sets as current formValues state
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      props.setFormValues(JSON.parse(reader.result))
    }
    reader.onerror = () => {
      console.log(reader.error)
    }
    reader.readAsText(file)

  }
  
  // opens the dialog when first submit button pressed
  const handleInitialSubmit = () => {
    setOpen(true)
  }

  // handles when the final submit button is pressed
  const handleFinalSumbit = async () => {
    // upload desc file to s3
    // get file location at s3
    // post form state + file location on s3 to express submit proposal endpoint

    // DERIVE FROM LOGGED IN USER
    const USERNAME = 'TESTUSER'

    // get the pre-signed url from lambda function
    let filePath = ''
    let signedUrl = ''
    try {
      let response = await fetch(`https://odvm2qkhmmjxvyvh47ydivsusu0dgtgy.lambda-url.ap-southeast-2.on.aws/?name=${USERNAME}&title=${props.formValues.proposaltitle}`)
      let data = await response.json()
      filePath = data.path
      signedUrl = data.url
    } catch (error) {
      console.error(error)
    }

    //upload file with pre-signed url
    try {
      let response = await fetch(signedUrl, {
        method: 'PUT',
        /*headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }, */
        body: props.formValues.descriptionfile
      })
      let data = await response.json()
    } catch (error) {
      console.log('error occurred:')
      console.error(error)
    }

    // get uploaded file location
    const proposal = props.formValues
    proposal.descriptionfile = filePath

    // post values to DB submission endpoint
    
    try {
      let response = await fetch('http://localhost:5000/submit_proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proposal)
      })
      
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className='main-container'>
      <div className='left-container'>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button variant='contained' component='label'>
                  Import File
                  <input type='file' hidden onChange={handleImport}/>
                </Button>

        </div>
   
        <div className='left-body-container'>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <h2 style={{display: 'inline'}} >Step {page + 1}</h2>
            
            <div>
              <IconButton disabled={page === 0} onClick={() => setPage( (page) => page - 1)} sx={{color: 'white'}}>
                <ArrowBackIosNew fontSize='small'/>
              </IconButton>

              <IconButton disabled={page === numPages-1} onClick={() => setPage( (page) => page + 1)} sx={{color: 'white', transform: 'rotate(180deg)'}}>
                <ArrowBackIosNew fontSize='small'/>
              </IconButton>
            </div>

          </div>

          <br />
          <p>{steps[page].description}</p>
          <br />
          <PageTitles page={page} steps={steps} handlePageClick={handlePageClick}/>
        
        </div>
      </div>
      <div className='right-container'>
        {showFormPage(page)}

        <br />

        <Box display='flex' justifyContent='space-between'>
          <div>
            <Button variant="outlined" disabled={page === 0}
            onClick={() => {
              setPage((prevPage) => prevPage - 1);
            }}>Back
            </Button>

            <Button variant="contained" disabled={page === numPages-1} 
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
            }}>Next
            </Button>
          </div>


          <Button variant='contained' onClick={handleInitialSubmit}>
            Submit
          </Button>
        </Box>

      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Proposal Review</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{wordWrap: 'normal', wordBreak:'break-word'}}>
            {JSON.stringify(props.formValues)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleFinalSumbit}>Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default Proposal