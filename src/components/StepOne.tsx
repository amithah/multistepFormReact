import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FormData } from "../types/types";

/**
 * Props for StepOne component
 */
interface StepOneProps {
  /** Form data containing user input */
  formData: FormData;
  /** Function to update form data */
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

/**
 * StepOne component for the first step of the wizard.
 * This step includes input fields for first name, last name, and a checkbox for terms agreement.
 * @param {StepOneProps} props - Props for StepOne component
 */
const StepOne: React.FC<StepOneProps> = ({ formData, setFormData }) => {
  /**
   * Function to handle input change and update form data.
   * It also performs validation for first name, last name, and terms agreement fields.
   * @param {string} key - Key of the field being updated in form data
   * @param {string | boolean} value - New value of the field
   */
  const handleChange = (key: keyof FormData, value: string | boolean) => {
    // Copying errors from form data
    const errorsCopy = { ...formData.errors };

    // Validate input
    if (typeof value === "string") {
      if (key === "firstName" || key === "lastName") {
        if (value.trim().length > 0 && value.trim().length < 2) {
          errorsCopy[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } should contain at least two characters`;
        } else if (
          value.trim().length >= 2 &&
          !/^[a-zA-Z]+$/.test(value.trim())
        ) {
          errorsCopy[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } should only contain letters`;
        } else {
          errorsCopy[key] = "";
        }
      } 
    }
    if (typeof value === "boolean") {
      if (key === "agreeToTerms") {
        if (!value) {
          errorsCopy[key] = "Please agree to the terms";
        } else {
          errorsCopy[key] = "";
        }
      }
    }

    // Update formData with errors
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
      errors: errorsCopy,
    }));
  };

  return (
    <>
      <Typography variant="h6" pb={3}>
        Wizard Modal, Step: 1/3
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* First Name TextField */}
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          value={formData.firstName}
          error={!!formData.errors.firstName}
          helperText={formData.errors.firstName}
          inputProps={{ maxLength: 30 }} // Set maximum length to 30 characters
          onChange={(e) => {
            const value = e.target.value;
            // Validate input to allow only alphabets or empty string
            if (/^[a-zA-Z]*$/.test(value) || value === "") {
              handleChange("firstName", value);
            }
          }}
        />
        {/* Last Name TextField */}
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          value={formData.lastName}
          error={!!formData.errors.lastName}
          helperText={formData.errors.lastName}
          inputProps={{ maxLength: 30 }} // Set maximum length to 30 characters
          onChange={(e) => {
            const value = e.target.value;
            // Validate input to allow only alphabets or empty string
            if (/^[a-zA-Z]*$/.test(value) || value === "") {
              handleChange("lastName", value);
            }
          }}
        />
        {/* Agree to Terms Checkbox */}
        <>
          {/* Agree to Terms Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
              id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
              />
            }
            label="Agree to Terms"
          />
          {/* Error message for terms agreement */}
          {formData.errors.agreeToTerms && (
            <Typography variant="body2" color="error">
              {formData.errors.agreeToTerms}
            </Typography>
          )}
        </>
      </Box>
    </>
  );
};

export default StepOne;
