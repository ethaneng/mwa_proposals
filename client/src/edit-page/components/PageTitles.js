import React from 'react'
import { Stepper } from '@mui/material'
import { Step } from '@mui/material'
import { StepLabel } from '@mui/material'

function PageTitles(props) {
  return (
    <div>

        <Stepper activeStep={props.page} orientation="vertical" sx={{
    '& .MuiStepLabel-label.Mui-active': {
        color: 'white',
        fontSize: '16px',
    },
    '& .MuiStepLabel-label.Mui-completed': {
        color: 'white',
        fontSize: '16px'
    },
    '& .MuiStepLabel-label.Mui-disabled': {
        color: 'white',
        fontSize: '16px'
    },
    '& .MuiStepLabel-label.Mui-disabled:hover': {
        cursor: 'pointer !important',
        textDecoration: 'underline',
    },
    '& .MuiCollapse-wrapperInner': {
        fontSize: '16px'
    },
    '& .MuiStepIcon-root.Mui-completed, & .MuiStepIcon-root': {
       color: '#71A9F7',
       fontSize: '1.5rem',
    },
    '& .MuiStepIcon-root.Mui-active': {
        color: '#1976d2',
        fontSize: '1.5rem',
    },
    '& .MuiStepIcon-text': {
        fill: '#282c56',
        fontWeight: 'bold'
    }
}}>
            {props.steps.map((step, index) => (
                <Step key={step.label} onClick={props.handlePageClick(index)} sx={{'&:hover': {
                    cursor: 'pointer !important',
                    textDecoration: 'underline',

                }}}>
                    <StepLabel sx={{color: 'white'}}>{step.label}</StepLabel>
                </Step>
            ))}
        </Stepper>

    </div>
  )
}

export default PageTitles