import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { childSymptomsList, childSymptomsType } from "../Data";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SymptomsList = () => {
  
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState(() => {
    const storedSymptoms = localStorage.getItem("selectedSymptoms");
    return storedSymptoms ? JSON.parse(storedSymptoms) : [];
  });
  const [selectedSubcategories, setSelectedSubcategories] = useState(() => {
    const storedSubcategories = localStorage.getItem("selectedSubcategories");
    return storedSubcategories ? JSON.parse(storedSubcategories) : [];
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    localStorage.setItem("selectedSymptoms", JSON.stringify(selectedSymptoms));
    localStorage.setItem(
      "selectedSubcategories",
      JSON.stringify(selectedSubcategories)
    );
  }, [selectedSymptoms, selectedSubcategories]);

  const handleCheckboxChange = (event) => {
    const symptom = event.target.name;
    setSelectedSymptoms((prevSelected) => {
      if (prevSelected.includes(symptom)) {
        return prevSelected.filter((selected) => selected !== symptom);
      }
      return [...prevSelected, symptom];
    });
  };

  const handleSubcategoryChange = (event) => {
    const subcategory = event.target.name;
    setSelectedSubcategories((prevSelected) => {
      if (prevSelected.includes(subcategory)) {
        return prevSelected.filter((selected) => selected !== subcategory);
      }
      return [...prevSelected, subcategory];
    });
  };

  const getSymptomsByCategory = (category) => {
    const type = childSymptomsType.find((type) => type.name === category);
    return type?.symptoms || [];
  };

  const getSubcategoriesBySymptom = (symptom) => {
    const subcategories = childSymptomsList.filter(
      (subcategory) => subcategory.parent === symptom
    );
    return subcategories;
  };

  const handleNext = () => {
    if (selectedSymptoms.length > 0) {
      setStep(2);
    }
    else{
      alert('Kindly choose at least one symptom')
    }
    
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleClick = () => {
    alert("Symptoms submitted successfully!");
    navigate("/Other_medical_info");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", padding: "2rem 3rem 1rem 3rem" }}>
      {step === 1 && (
        <>
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
          <Typography variant="h4" gutterBottom sx={{ color: "#333" }}>
            Alice needs help with...
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#777" }}>
            Please select all symptoms your child is
          </Typography>

          {childSymptomsList.map((symptom) => (
            <Accordion key={symptom.id} sx={{ my: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${symptom.name}-content`}
                id={`${symptom.name}-header`}
                sx={{ backgroundColor: "#ddd" }}
              >
                <Typography variant="h6" sx={{ color: "#333" }}>
                  {symptom.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {getSymptomsByCategory(symptom.name).map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={item}
                            checked={selectedSymptoms.includes(item)}
                            onChange={handleCheckboxChange}
                            sx={{ color: "#777" }}
                          />
                        }
                        label={item}
                        sx={{ color: "#333" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Box>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h4" gutterBottom sx={{ color: "#333" }}>
            All Symtoms that have been selected
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#777" }}>
            Before submitting, please review and confirm your child's symptoms
            and then click the submit button.
          </Typography>

          {selectedSymptoms.map((symptom) => (
            <Accordion key={symptom} sx={{ my: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${symptom}-content`}
                id={`${symptom}-header`}
                sx={{ backgroundColor: "#ddd" }}
              >
                <Typography variant="h6" sx={{ color: "#333" }}>
                  {symptom}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {getSubcategoriesBySymptom(symptom).map(
                    (subcategory, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={subcategory.name}
                              checked={selectedSubcategories.includes(
                                subcategory.name
                              )}
                              onChange={handleSubcategoryChange}
                              sx={{ color: "#777" }}
                            />
                          }
                          label={subcategory.name}
                          sx={{ color: "#333" }}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleClick} sx={{ ml: 2 }}>
              Submit
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
export default SymptomsList;
