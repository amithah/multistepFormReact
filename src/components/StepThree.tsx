import { Box, Typography } from "@mui/material";
import { FormData } from "../types/types";

/**
 * Props for StepThree component
 */
interface StepThreeProps {
  /** Form data containing user inputs */
  formData: FormData;
}

/**
 * StepThree component for the third step of the wizard.
 * This step displays a summary of the data entered in the previous steps for review and confirmation.
 * @param {StepThreeProps} props - Props for StepThree component
 */
const StepThree: React.FC<StepThreeProps> = ({ formData }) => {
  return (
    <>
      <Typography variant="h6" pb={3}>
        Wizard Modal, Step: 3/3
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="h6">Review and Confirm</Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="subtitle1">
            First Name: {formData?.firstName}
          </Typography>
          <Typography variant="subtitle1">
            Last Name: {formData?.lastName}
          </Typography>
          <Typography variant="subtitle1">
            Agree To Terms: {formData?.agreeToTerms ? "Yes" : "No"}
          </Typography>
          <Typography variant="subtitle1">
            Favorite Color: {formData?.favColor}
          </Typography>
          <Typography variant="subtitle1">
            Birth Date:{" "}
            {formData?.birthDate
              ? formData?.birthDate?.toLocaleDateString()
              : ""}
          </Typography>
          <Typography variant="subtitle1">
            Favorite Fruit: {formData?.favFruit}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default StepThree;
