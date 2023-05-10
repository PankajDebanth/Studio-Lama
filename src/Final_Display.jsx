import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Final_Display = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedSlot = localStorage.getItem("selectedSlot");
    const selectedCallType = localStorage.getItem("selectedCallType");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    const dob = localStorage.getItem("dob");
    const height = localStorage.getItem("height");
    const heightUnit = localStorage.getItem("heightUnit");
    const weight = localStorage.getItem("weight");
    const weightUnit = localStorage.getItem("weightUnit");
    const premature = localStorage.getItem("premature");
    const selectedSubcategories = JSON.parse(
      localStorage.getItem("selectedSubcategories")
    );
    const selectedSymptoms = JSON.parse(
      localStorage.getItem("selectedSymptoms")
    );
    const problemInfo = localStorage.getItem("problemInfo");

    setFormData({
      selectedDate,
      selectedSlot,
      selectedCallType,
      name,
      email,
      phone,
      dob,
      height,
      heightUnit,
      weight,
      weightUnit,
      premature,
      selectedSubcategories,
      selectedSymptoms,
      problemInfo,
    });
  }, []);

  return (
    <Box sx={{ padding:'2rem 3rem 1rem 3rem',maxWidth: 800, mx: "auto" }}>
      <Grid container spacing={2} justifyContent="space-evenly">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" sx={{ marginBottom: "1rem", fontFamily:'Rubik' }}>
            Scheduled Successfully!
          </Typography>
          <hr style={{ borderTop: "1px solid #ccc" }} />
        </Grid>

        <Paper
          sx={{
            p: "1rem",
            md: "1rem",
            background: "#f9f9f9",
            borderRadius: "10px",
            marginBottom:'1rem'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Personal Information:</Typography>
              <Typography variant="body1" sx={{paddingTop:2}}><strong>Name:</strong> {formData.name}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {formData.email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {formData.phone}</Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {formData.dob}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6">Health Information:</Typography>
              <Typography variant="body1" sx={{paddingTop:2}}>
                <strong>Height:</strong> {formData.height}{" "}
                {formData.heightUnit}
              </Typography>
              <Typography variant="body1">
                <strong>Weight:</strong> {formData.weight}{" "}
                {formData.weightUnit}
              </Typography>
              <Typography variant="body1">
                <strong>Premature Birth:</strong> {formData.premature}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Appointment Information:</Typography>
              <Typography variant="body1" sx={{paddingTop:2}}>
                <strong>Selected Call Type:</strong> {formData.selectedCallType}
              </Typography>
              <Typography variant="body1">
                <strong>Selected Slot:</strong> {formData.selectedSlot}
              </Typography>
              <Typography variant="body1">
                <strong>Selected Date:</strong> {formData.selectedDate}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6}>
            <Button type="submit" variant="contained" onClick={()=>{navigate('/')}}>
              Go To Home
            </Button>
          </Grid>
    </Box>
  );
};
export default Final_Display;
