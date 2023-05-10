import React, { useState } from 'react';
import { Button, Grid, Typography, Box,IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { MdSettingsVoice } from 'react-icons/md';
import { BsFillCameraVideoFill } from 'react-icons/bs';




const Sche_appointment = () => {
    
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedCallType, setSelectedCallType] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCallTypeChange = (type) => {
    setSelectedCallType(type);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedSlot || !selectedCallType) {
        alert('Please select all fields before submitting');
        return;
      }
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedSlot', selectedSlot);
    localStorage.setItem('selectedCallType', selectedCallType);
    navigate('/Final_Display')
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", padding:'2rem 3rem 1rem 3rem' }}>
        <IconButton
        onClick={() => window.history.back()}
        sx={{ top: "0", left: "0", marginBottom: "2rem" }}
      >
        <Grid item>
          <ArrowBackIosIcon />
        </Grid>
        <Grid item>
          <Box fontWeight="bold" ml={1}>
            Back
          </Box>
        </Grid>
      </IconButton>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ marginBottom: "1rem", fontFamily:'Rubik' }}>
          Schedule an appointment
          </Typography>
          <hr style={{ borderTop: "1px solid #ccc" }} />
        </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginTop: "0.5rem", fontFamily:'Rubik'}}>
          Select Date and Time
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          className="form-control"
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
          }}
          minDate={new Date()}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginTop: "2rem", fontFamily:'Rubik'}}>
          Select Time Slot
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant={selectedSlot === 'slot1' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleSlotChange('slot1')}
        >
          Slot 1
        </Button>
        <Button
          variant={selectedSlot === 'slot2' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleSlotChange('slot2')}
        >
          Slot 2
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginTop: "2rem", fontFamily:'Rubik'}}>
          Select Call Type
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant={selectedCallType === 'video' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleCallTypeChange('video')}
        > <BsFillCameraVideoFill size={18} color="black"style={{paddingRight:'0.5rem'}}/>
          Video Call
        </Button>
        <Button
          variant={selectedCallType === 'voice' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleCallTypeChange('voice')}
        > <MdSettingsVoice size={18} color="black"style={{paddingRight:'0.5rem'}} />

          Voice Call
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
    </Box>
  );
};
export default Sche_appointment;
