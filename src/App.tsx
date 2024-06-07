import { Box, Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../index.css";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import { useState } from "react";
import { FormData } from "./types/types";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
  },
  successMessage: {
    color: "#4caf50",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
}));

/**
 * Main App component containing the wizard form.
 * @returns {JSX.Element} JSX representation of the App component.
 */
function App() {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    agreeToTerms: true,
    favColor: "",
    birthDate: undefined,
    favFruit: "",
    errors: {
      firstName: "",
      lastName: "",
      agreeToTerms: "",
      favColor: "",
      favFruit: "",
    },
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  /**
   * Function to handle moving to the previous step.
   */
  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  /**
   * Function to handle moving to the next step.
   */
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  /**
   * Function to handle form submission.
   */
  const handleSubmit = () => {
    setFormSubmitted(true); // Set formSubmitted to true after successful submission
  };

  /**
   * Function to render the current step based on the currentStep state.
   * @returns {JSX.Element} JSX representation of the current step.
   */
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne formData={formData} setFormData={setFormData} />;
      case 2:
        return <StepTwo formData={formData} setFormData={setFormData} />;
      case 3:
        return <StepThree formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <form id="wizard" onSubmit={handleSubmit}>
      <Container maxWidth="sm" className={classes.container}>
        {renderStep()}
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {!formSubmitted && (
            <>
              <Button
                disabled={currentStep === 1}
                onClick={handlePrevStep}
                variant="text"
              >
                Back
              </Button>
              {currentStep !== 3 ? (
                <Button
                  disabled={Object.values(formData.errors).some(
                    (error) => !!error
                  )}
                  variant="text"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : (
                <Button variant="text" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </>
          )}
          {formSubmitted && (
            <Typography className={classes.successMessage}>
              Form submitted successfully!
            </Typography>
          )}
        </Box>
      </Container>
    </form>
    // <Container maxWidth="sm" className={classes.container}>
    //   <Typography>
    //     Use this component as a starting point for your assignment
    //   </Typography>
    //   <Button variant="contained">OK</Button>
    // </Container>
  );
}

export default App;
