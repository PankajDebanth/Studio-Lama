import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot be longer than 20 characters")
    .matches(/^[A-Za-z ]*$/, "Name must only contain letters and spaces")
    .required("Name is required"),
  dob: Yup.string().required("Date of birth is required"),
  premature: Yup.string().required("Born prematurely is required"),
  weight: Yup.string().required("Children's weight is required"),
  weightUnit: Yup.string().required("Weight unit is required"),
  height: Yup.string().required("Children's height is required"),
  heightUnit: Yup.string().required("Height unit is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phone: Yup.string().required("Phone number is required"),
});

const Home = () => {

  const navigate = useNavigate();
  const [showPrematureWeek, setShowPrematureWeek] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      premature: "",
      prematureWeek: "",
      weight: "",
      weightUnit: "kg",
      height: "",
      heightUnit: "cm",
      email: "",
      phone: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.name);
      localStorage.setItem("name", values.name);
      localStorage.setItem("dob", values.dob);
      localStorage.setItem("premature", values.premature);
      if (values.premature === "Yes") {
        localStorage.setItem("prematureWeek", values.prematureWeek);
      }
      localStorage.setItem("weight", values.weight);
      localStorage.setItem("weightUnit", values.weightUnit);
      localStorage.setItem("height", values.height);
      localStorage.setItem("heightUnit", values.heightUnit);
      localStorage.setItem("email", values.email);
      localStorage.setItem("phone", values.phone);
      navigate("/SymtomsList");
    },
  });

  const handlePrematureChange = (event) => {
    formik.handleChange(event);
    setShowPrematureWeek(event.target.value === "Yes");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", padding: "2rem 3rem 3rem 3rem" }}>
      <Typography
        variant="h4"
        component="h2"
        alignContent="center"
        sx={{ fontWeight: "bold", fontSize: "30px", paddingBottom: "1rem" }}
      >
        Get your questions answered by our consultants from the comfort of your
        home
      </Typography>
      <hr style={{ borderTop: "1px solid #ccc" }} />

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={20} sm={6}>
            <TextField
              label="Children's Name"
              name="name"
              variant="outlined"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Children's Date of Birth"
              variant="outlined"
              name="dob"
              fullWidth
              value={formik.values.dob}
              onChange={formik.handleChange}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Born at less than 37 weeks
              </Typography>
              <RadioGroup
                aria-label="premature"
                name="premature"
                defaultValue="No"
                value={formik.values.premature}
                onChange={handlePrematureChange}
                error={
                  formik.touched.premature && Boolean(formik.errors.premature)
                }
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
              {formik.touched.premature && formik.errors.premature && (
                <Typography variant="caption" color="error">
                  {formik.errors.premature}
                </Typography>
              )}
            </FormControl>
          </Grid>
          {formik.values.premature === "Yes" && (
            <Grid item xs={12}>
              <FormControl>
                <TextField
                  id="prematureWeek"
                  name="prematureWeek"
                  label="Number of weeks"
                  variant="outlined"
                  value={formik.values.prematureWeek}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.prematureWeek &&
                    Boolean(formik.errors.prematureWeek)
                  }
                />
                {formik.touched.prematureWeek &&
                  formik.errors.prematureWeek && (
                    <Typography variant="caption" color="error">
                      {formik.errors.prematureWeek}
                    </Typography>
                  )}
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              label="Children's weight"
              name="weight"
              variant="outlined"
              fullWidth
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Weight unit</InputLabel>
              <Select
                label="Weight unit"
                name="weightUnit"
                value={formik.values.weightUnit}
                onChange={formik.handleChange}
                error={
                  formik.touched.weightUnit && Boolean(formik.errors.weightUnit)
                }
              >
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
              </Select>
              {formik.touched.weightUnit && formik.errors.weightUnit && (
                <Typography variant="caption" color="error">
                  {formik.errors.weightUnit}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Children's height"
              name="height"
              variant="outlined"
              fullWidth
              value={formik.values.height}
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Height unit</InputLabel>
              <Select
                label="Height unit"
                name="heightUnit"
                value={formik.values.heightUnit}
                onChange={formik.handleChange}
                error={
                  formik.touched.heightUnit && Boolean(formik.errors.heightUnit)
                }
              >
                <MenuItem value="cm">cm</MenuItem>
                <MenuItem value="in">in</MenuItem>
              </Select>
              {formik.touched.heightUnit && formik.errors.heightUnit && (
                <Typography variant="caption" color="error">
                  {formik.errors.heightUnit}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phone"
              variant="outlined"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Home;
