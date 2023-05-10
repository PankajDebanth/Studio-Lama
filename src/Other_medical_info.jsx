import React, { useState } from 'react';
import { Box, Button, TextField, Grid,  Typography, IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


const Other_medical_info = ()=> {

  const [formData, setFormData] = useState({
    problemInfo: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('problemInfo', formData.problemInfo);
    navigate('/Sche_appointment')
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = ()=>{
    navigate('/SymtomsList')
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", padding:'2rem 3rem 1rem 3rem'}}>
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
          Any other information you'd like us to know?
          </Typography>
          <hr style={{ borderTop: "1px solid #ccc", marginBottom:'2rem' }} />
        </Grid>
      <TextField
        label="Mention any medical history, family history, any incident which caused concern, food and sleep routine (Optional)"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        name="problemInfo"
        value={formData.problemInfo}
        onChange={handleChange}
        sx={{ mb: 3}}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Other_medical_info;
