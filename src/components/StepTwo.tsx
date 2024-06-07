import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Typography,
  InputLabel,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormData } from "../types/types";

/**
 * Props for StepTwo component
 */
interface StepTwoProps {
  /** Form data containing user inputs */
  formData: FormData;
  /** Function to update the form data */
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

/**
 * StepTwo component for the second step of the wizard.
 * This step includes input fields for favorite color, birth date, and favorite fruit.
 * @param {StepTwoProps} props - Props for StepTwo component
 */
const StepTwo: React.FC<StepTwoProps> = ({ formData, setFormData }) => {
  /**
   * Function to handle input change and update the data.
   * @param {string} key - Key of the field being updated in form data.
   * @param {string | boolean | undefined | Date} value - New value of the field.
   */
  const handleChange = (
    key: keyof typeof formData,
    value: string | boolean | undefined | Date
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  return (
    <>
      <Typography variant="h6" pb={3}>
        Wizard Modal, Step: 2/3
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Favorite Color</FormLabel>
          <RadioGroup
            aria-label="favorite-color"
            name="favorite-color"
            value={formData.favColor}
            onChange={(e) => handleChange("favColor", e.target.value)}
            row
          >
            <FormControlLabel value="Red" control={<Radio />} label="Red" />
            <FormControlLabel value="Blue" control={<Radio />} label="Blue" />
            <FormControlLabel value="Green" control={<Radio />} label="Green" />
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            maxDate={new Date()} // Disable future dates
            label="Birth Date"
            defaultValue={formData.birthDate ?? undefined}
            onChange={(value: Date | null) =>
              handleChange("birthDate", value || undefined)
            }
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel>Favorite Fruit</InputLabel>
          <Select
            label="Favorite Fruit"
            value={formData.favFruit}
            onChange={(e) => handleChange("favFruit", e.target.value as string)}
          >
            <MenuItem value="Apple">Apple</MenuItem>
            <MenuItem value="Banana">Banana</MenuItem>
            <MenuItem value="Mango">Mango</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default StepTwo;
