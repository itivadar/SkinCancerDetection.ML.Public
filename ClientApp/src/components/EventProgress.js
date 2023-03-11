import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

const steps = ['Validate', 'Store','Enhance', 'Analyze'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(12,49, 159) 0%,rgb(52,111,229) 50%,rgb(91,66,191) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 95deg,rgb(12,49, 159) 0%,rgb(52,111,229) 50%,rgb(91,66,191) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibConnectorVertical = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <DoneIcon/>,
    2: <StorageOutlinedIcon />,
    3: <AutoFixHighOutlinedIcon />,
    4: <AccountTreeOutlinedIcon/>
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      { active ? (<CircularProgress color='inherit' sx={{padding: 0.4}}/>) : ( icons[String(props.icon)] )}
      
    </ColorlibStepIconRoot>
  );
}

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 45,
  height: 45,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
    'linear-gradient( 136deg,rgb(12,49, 159) 0%,rgb(52,111,229) 50%,rgb(91,66,191) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
    'linear-gradient( 136deg,rgb(12,49, 159) 0%,rgb(52,111,229) 50%,rgb(91,66,191) 100%)',
  }),
}));

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function getSteps() {
  return steps.map((label, index) => {
    const stepProps = {};
    const labelProps = {};
    return (
      <Step key={label} {...stepProps}>
        <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
          {label}
        </StepLabel>
      </Step>
    );
  });
}

export default function HorizontalLinearStepper(props) {

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={props.status + 1}
        connector={<ColorlibConnector />}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {getSteps()}
      </Stepper>

      <Stepper
        activeStep={props.status + 1}
        orientation="vertical"
        sx={{ display: { xs: "inline", md: "none" } }}
      >
        {getSteps()}
      </Stepper>
    </Box>
  );
}