import React from 'react'
import { useState } from 'react'
import { Grid, Card, CardHeader, IconButton, CardContent, TextField, Button, Dialog, DialogTitle, DialogContentText, DialogContent, MenuItem, DialogActions} from '@mui/material'
import { Edit, Clear } from '@mui/icons-material'
import axios from 'axios'

window.Buffer = window.Buffer || require("buffer").Buffer; 



function Sources(props) {

    const [sourceNames, setSourceNames] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [fileDialogOpen, setFileDialogOpen] = useState(false)
    const [editedSource, setEditedSource] = useState({
      'key': '',
      'name': '',
      'type': '',
      'ra': '',
      'dec': '',
      'comment': ''
    })

  async function lookupName(name, comment = '') {

        const URL = 'https://m2inkha5fumoplrcw3jjythwgu0ovbdr.lambda-url.ap-southeast-2.on.aws/'
    
        const response = await fetch(URL + '?name=' + name);
        
        const json = await response.json();
    
        let newSources = props.formValues.sources;
    
        if (!json.error) {
          newSources.push({'name': name, type: 'RA/DEC', 'ra': json.ra, 'dec': json.dec, 'comment': comment})
        } else { // cant find source
          newSources.push({'name': name, type: 'RA/DEC','ra': '', 'dec': '', 'comment': 'Couldn\'t lookup source'})
        }
    
        props.setFormValues({
          ...props.formValues,
          sources: newSources
        })
        
    
      }
    
  const findSources = () => {
    let sourceArray = sourceNames.split(',');

    // for each source in sourceArray
    // lookup source details and add looked up source details to formValus source array
    // use lambda for the lookup

    sourceArray.forEach( (value) => (
        lookupName(value)
    ) )

    }
    
  const editSource = (key) => {
    // get edited source details and set it to edit source form state
    setEditedSource({
        ...props.formValues.sources[key],
        'key': key
    })
    setDialogOpen(true)

    }
    
  const closeDialog = () => {
    setEditedSource({ // reset edited source state
        'key': '',
        'name': '',
        'type': 'RA/DEC',
        'ra': '',
        'dec': '',
        'comment': ''
    })
    setDialogOpen(false)
    }

  const saveDialog = (key) => {
    let sourceArray = props.formValues.sources
    if (editedSource.type === 'RA/DEC') {
        sourceArray[key] = {
        'name': editedSource['name'],
        'type': editedSource['type'],
        'ra': editedSource['ra'],
        'dec': editedSource['dec'],
        'comment': editedSource['comment']
        }
    } else if (editedSource.type === 'GLON/GLAT') {
        sourceArray[key] = {
        'name': editedSource['name'],
        'type': editedSource['type'],
        'glon': editedSource['glon'],
        'glat': editedSource['glat'],
        'comment': editedSource['comment']
        }
    } else if (editedSource.type === 'AZ/EL') {
        sourceArray[key] = {
        'name': editedSource['name'],
        'type': editedSource['type'],
        'az': editedSource['az'],
        'el': editedSource['el'],
        'comment': editedSource['comment']
        }
    }
    // update formValues with new sources
    props.setFormValues({
        ...props.formValues,
        'sources': sourceArray
    })
    closeDialog()
    }
    
  const deleteSource = (key) => {
    let sourceArray = props.formValues.sources
    sourceArray.splice(key, 1)

    props.setFormValues({
        ...props.formValues,
        'sources': sourceArray
    })
    }

  const parseSourceFile = async (e) => {
    let formData = new FormData()
    let file = e.target.files[0]
    formData.append('sourceFile', file)

    let response = await axios.post('http://localhost:5000/read_sources_from_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    let data = response.data

    let contentArray = data.split(/\r\n|\n/) // split the text into an array containing each line in the text
    contentArray.forEach((line)=> { // for each line 
      let lineContent = line.split(', ') // split line by commas and insert into array

      let sourceComment = ''
      if (lineContent[0] === 'CUSTOM') { // check if custom source or not
        if (lineContent[5]) {
          sourceComment = lineContent[5] // if custom and a comment exists, set to comment
        }
      } else {
        if (lineContent[1]) {
          sourceComment = lineContent[1] // else if not custom and comment exists, set to comment
        }
      }

      if (lineContent[0] === 'CUSTOM') { // for custom sources
      let newSource = {}
      if (lineContent[2] === 'RA/DEC') { //add new source as if radec
        newSource = {
          'name': lineContent[1],
          'type': lineContent[2],
          'ra': lineContent[3],
          'dec': lineContent[4],
          'comment': sourceComment
        }
      } else if (lineContent[2] === 'GLON/GLAT') { //add new source as if glon/glat
        newSource = {
          'name': lineContent[1],
          'type': lineContent[2],
          'glon': lineContent[3],
          'glat': lineContent[4],
          'comment': sourceComment
        }
      } else if (lineContent[2] === 'AZ/EL') { //add new source as if ez/al
        newSource = {
          'name': lineContent[1],
          'type': lineContent[2],
          'az': lineContent[3],
          'el': lineContent[4],
          'comment': sourceComment
        }
      }

      let sourceArray = props.formValues.sources
      sourceArray.push(newSource)
      props.setFormValues({...props.formValues, 'sources': sourceArray}) // push new source to state

      } else { // for named source
      lookupName(lineContent[0], sourceComment)
      }
    })
    setFileDialogOpen(false)
  }
  

  const openFileDialog = () => {
    setFileDialogOpen(true)
  }

  const closeFileDialog = () => {
    setFileDialogOpen(false)
  }

  return (
    <div>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <h4>Sources</h4>
        </Grid>

        <Grid item xs={12}>
        <div style={{maxHeight: '400px', overflowY: 'scroll', width: '100%', background: '#edededde'}}>
          <Grid container spacing={2} sx={{padding: '5px'}}>
            {props.formValues.sources.map( (value, index) => (
              <Grid item xs={6} lg={4} xl={3} key={index} >
                <Card sx={{padding: '10px', height: '100%'}} >
                  
                  <CardHeader 
                    data-key={index}
                    title={value.name}
                    action={
                      <>
                          <IconButton onClick={ () => (editSource(index)) } >
                            <Edit size='small' color='primary'/>
                          </IconButton>
                          <IconButton onClick={ () => (deleteSource(index)) } >
                            <Clear size='small' sx={{color: 'red'}}/>
                          </IconButton>
                      </>
                      } >
                  </CardHeader>
                  <CardContent>
                    <p>{value['type']}</p>
                    <p>{value.type === 'RA/DEC' ? value.ra : value.type === 'GLON/GLAT' ? value.glon : value.type === 'AZ/EL' ? value.az : ''}</p>
                    <p>{value.type === 'RA/DEC' ? value.dec : value.type === 'GLON/GLAT' ? value.glat : value.type === 'AZ/EL' ? value.el : ''}</p>
                    <p>{value['comment']}</p>
                  </CardContent>
                </Card>
              </Grid>
            ) )}
          </Grid>
        </div></Grid>

        <Grid item xs={12}>
          <TextField
            id='sourceNames-input'
            name='sourceNames'
            label='Source Name(s)'
            values={sourceNames}
            onChange={(e) => {
              setSourceNames(e.target.value);
            }}
            fullWidth
            multiline />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant='contained'
            onClick={findSources}>Add Source Names
          </Button>
          
          <Button variant="outlined" onClick={openFileDialog}>
            Use File
          </Button>

        </Grid>

        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>Edit Source</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <DialogContentText>Update the information for the given source. Click save to commit changes.</DialogContentText>
              </Grid>
              <Grid item xs={12} >
                <TextField 
                  label='Source Name'
                  value={editedSource['name']}
                  onChange={(e) => (setEditedSource({...editedSource, 'name': e.target.value}))}
                  fullWidth />
              </Grid>
              <Grid item xs={12} >
                <TextField 
                  label='Coordinate Type'
                  value={editedSource['type']}
                  onChange={(e) => (setEditedSource({...editedSource, 'type': e.target.value}))}
                  fullWidth
                  select>
                  <MenuItem value='RA/DEC'>RA/DEC</MenuItem>
                  <MenuItem value='GLON/GLAT'>GLON/GLAT</MenuItem>
                  <MenuItem value='AZ/EL'>AZ/EL</MenuItem>
                </TextField>
              </Grid>

              {editedSource['type'] === 'RA/DEC' ? // SHOW RA / DEC COORDS IN FORM
              <><Grid item xs={6} >
                <TextField 
                  label='RA'
                  value={editedSource['ra']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'ra': e.target.value}))}
                  fullWidth/>
              </Grid>
              <Grid item xs={6} >
                <TextField 
                  label='DEC'
                  value={editedSource['dec']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'dec': e.target.value}))}
                  fullWidth/>
              </Grid></> : ''}

              {editedSource['type'] === 'GLON/GLAT' ? // SHOW GLON / GLAT COORDS IN FORM
              <><Grid item xs={6} >
                <TextField 
                  label='GLON'
                  value={editedSource['glon']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'glon': e.target.value}))}
                  fullWidth/>
              </Grid>
              <Grid item xs={6} >
                <TextField 
                  label='GLAT'
                  value={editedSource['glat']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'glat': e.target.value}))}
                  fullWidth/>
              </Grid></> : ''}

              {editedSource['type'] === 'AZ/EL' ? // SHOW AZ / EL COORDS IN FORM
              <><Grid item xs={6} >
                <TextField 
                  label='AZ'
                  value={editedSource['az']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'az': e.target.value}))}
                  fullWidth/>
              </Grid>
              <Grid item xs={6} >
                <TextField 
                  label='EL'
                  value={editedSource['el']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'el': e.target.value}))}
                  fullWidth/>
              </Grid></> : ''}
          
              <Grid item xs={12} >
                <TextField 
                  label='Comment'
                  value={editedSource['comment']} 
                  onChange={(e) => (setEditedSource({...editedSource, 'comment': e.target.value}))}
                  fullWidth/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={() => (saveDialog(editedSource['key']))}>Save</Button>
            <Button variant='outlined' onClick={closeDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={fileDialogOpen} onClose={closeFileDialog} >
          <DialogTitle>Upload Source File</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>Each line in the uploaded file(s) should identify a single source in the following format:<br/>
                  <br/>For a <i>Named Source</i>: Source Name, Comment*
                  <br/>For a <i>Custom Source</i>: CUSTOM, Name, RA/DEC or GLON/GLAT or AZ/EL, Coordinate1, Coordinate2, Comment*</DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' component='label' fullWidth>
                  Parse File to API
                  <input name='sourceFile' type='file' hidden onChange={parseSourceFile}/>
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
    </Grid>
    </div>
  )
}

export default Sources