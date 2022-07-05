import { Paper, Grid, Divider } from '@mui/material'
import React from 'react'

function Page5(props) {
  return (
    <Paper elevation={4} sx={{padding: '20px'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} xl={6}>
                <h4>Proposal Name:</h4>
                <p>{props.formValues.proposaltitle}</p>
            </Grid>
            <Grid item xs={12} xl={6}>
                <h4>Contact Email:</h4>
                <p>{props.formValues.contactemail}</p>
            </Grid>

            <Grid item xs={12}>
                <h4>Proposal Members:</h4>
                <Grid container spacing={3}>
                    {props.formValues.proposalmembers.map((mem, index) => (
                        <Grid item xs='auto'>
                            <p key={index} >{mem.name}</p>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item xs={12} xl={3}>
                <h4>Total Time Requested</h4>
                <p>{props.formValues.totaltimerequested}</p>
            </Grid>
            <Grid item xs={12} xl={3}>
                <h4>Shared Time Requested:</h4>
                <p>{props.formValues.sharedtimerequested}</p>
            </Grid>
            <Grid item xs={12} xl={6}>
                <h4>Requested Time Category:</h4>
                <p>{props.formValues.requestedtimecategory}</p>
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item xs={12} xl={3}>
                <h4>Areas of Science:</h4>
                <p>{props.formValues.areasofscience}</p>
            </Grid>
            <Grid item xs={12} xl={3}>
                <h4>Array Config:</h4>
                <p>{props.formValues.arrayconfig}</p>
            </Grid>
            <Grid item xs={12} xl={6}>
                <h4>Requested Frequencies:</h4>
                <p>{props.formValues.requestedfrequencies}</p>
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item xs={12} xl={3}>
                <h4>Large Proposal:</h4>
                <p>{props.formValues.islargeproposal}</p>
            </Grid>
            <Grid item xs={12} xl={3}>
                <h4>Continuation of Previous Proposal:</h4>
                <p>{props.formValues.iscontinuation}</p>
            </Grid>
            <Grid item xs={12} xl={6}>
                <h4>Observing Modes Requested:</h4>
                <p>{props.formValues.observingmodesrequested}</p>
            </Grid>

            <Grid item xs={12}>
                <h4>Commensal Proposals</h4>
                <Grid container spacing={1}>
                    {props.formValues.commensalproposals.map((proposal, index) => (
                        <Grid item xs='auto'>
                            <p>{proposal}</p>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item xs={12}>
                <h4>Proposal Interruptibility:</h4>
                <p>{props.formValues.proposalinterruptibility}</p>
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item xs={12}>
                <h4>Proposal Abstract</h4>
                <p>{props.formValues.proposalabstract}</p>
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item xs={12}>
                <h4>Descriptions File</h4>
                <p>{props.formValues.descriptionsFile}</p>
            </Grid>
            <Grid item xs={12}>
                <h4>Calibration Field:</h4>
                <p>{props.formValues.calibratorfields}</p>
            </Grid>
            <Grid item xs={12}>
                <h4>Sources:</h4>
                {props.formValues.sources.map((elem, index) => {
                    return (
                        <p key={index}>{elem.name}</p>
                    )
                })}
            </Grid>
            <Grid item xs={12}>
                <h4>Frequency Channel Sets:</h4>
                {props.formValues.frequencysets.map((elem, index) => {
                    return (
                        <p key={index}>{elem}</p>
                    )
                })}
            </Grid>
        </Grid>
    </Paper>
  )
}

export default Page5