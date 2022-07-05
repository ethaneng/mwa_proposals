import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Paper } from '@mui/material'
import { Clear } from '@mui/icons-material'
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank } from '@mui/icons-material'
function ProposalMembers(props) {

    // state
    const [open, setOpen] = useState(false);
    const [studentCheck, setStudentCheck] = useState(false);
    const [piCheck, setPiCheck] = useState(false);
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value); // changes name state according to name field
    };
    
    const handleClickOpen = () => {
        setOpen(true); // changes dialog open state
    };

    const handleCancel = () => { // resets all new member fields and closes dialog
        setStudentCheck(false);
        setPiCheck(false);
        setName('');
        setOpen(false);
    };

    const handleAddMember = () => { // adds new member to proposalmembers array in formValues state from App.js
        let member = { // create member obj
            name: name,
            isPI: piCheck,
            isStudent: studentCheck 
        }
        let memberArray = props.array;
        memberArray.push(member); // copy previous version of array and add new member

        memberArray.sort((a, b) => Number(b.isPI) - Number(a.isPI)); // sorts array by isPI - sets Primary Investigator first in array

        props.setFormValues({ // copy all other formValues but replace proposalmembers with new array including new member
            ...props.formValues,
            proposalmembers: memberArray,
        })

        setStudentCheck(false); // reset new member fields after added member
        setPiCheck(false);
        setName('');
        setOpen(false);
    };

    const handleDeleteMember = (i) => { // remove member from proposalmembers array in formValues from app.js state
        let memberArray = props.array; // copy prev array
        memberArray.splice(i, 1); // remove member at index
        props.setFormValues({ // update state from app.js
            ...props.formValues,
            proposalmembers: memberArray
        })
    }

    

  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h4>Proposal Members</h4>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table padding="normal">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: '50%', fontWeight:'bold', htmlColor: '#75757'}}>Name</TableCell>
                                <TableCell align='center' sx={{fontWeight:'bold', htmlColor: '#75757'}}>Primary Investigator</TableCell>
                                <TableCell align='center' sx={{fontWeight:'bold', htmlColor: '#75757'}}>Student</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.array.map( (member, i) => (
                                <TableRow key={member.name}>
                                    <TableCell sx={{width:'50%'}}>{member.name}</TableCell>
                                    <TableCell align='center'>{member.isPI ? <CheckBoxIcon htmlColor='#757575' /> : <CheckBoxOutlineBlank htmlColor='#757575' /> }</TableCell>
                                    <TableCell align='center'>{member.isStudent ? <CheckBoxIcon htmlColor='#757575' /> : <CheckBoxOutlineBlank htmlColor='#757575' /> }</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={handleDeleteMember}> <Clear htmlColor='red'/> </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item align="left">
                <Button variant="contained" onClick={handleClickOpen}>Add Member</Button>
                
                <Dialog open={open} onClose={handleCancel} >
                    <DialogTitle>New Proposal Member</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Fill in the following information to add a new member to the Proposal.</DialogContentText>
                        <FormGroup>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField 
                                        autoFocus
                                        id="newMemberName"
                                        label="Full Name"
                                        type="text"
                                        value={name}
                                        fullWidth
                                        onChange={handleNameChange}
                                        sx={{marginTop: '15px'}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel control={<Checkbox checked={piCheck} onChange={(e) => (
                                        setPiCheck(e.target.checked)
                                    )} />}
                                    label="Primary Investigator"
                                    />
                                    
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel control={<Checkbox checked={studentCheck} onChange={(e) => (
                                        setStudentCheck(e.target.checked)
                                    )} />}
                                    label="Student"
                                    />
                                    
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>

    </div>
  )
}

export default ProposalMembers