import { useState, useRef } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

const CenteredContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(6),
  },
}));

const PictureInputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({}));

export default function CarDetail() {
  const [pictures, setPictures] = useState([]);
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxPictures, setMaxPictures] = useState(1); // Default to 1
  const [submissionMessage, setSubmissionMessage] = useState(""); // Submission message state
  const fileInputRef = useRef(null); // Create a ref for the file input
  const [selectedFileName, setSelectedFileName] = useState(""); // State to track the selected file name

  const handleDeletePicture = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setPictures(updatedPictures);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setSelectedFileName("");
    }
  };

  const handleMaxPicturesChange = (e) => {
    const selectedMaxPictures = parseInt(e.target.value, 10);
    setMaxPictures(selectedMaxPictures);

    if (pictures.length > selectedMaxPictures) {
      const updatedPictures = pictures.slice(0, selectedMaxPictures);
      setPictures(updatedPictures);
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice) && newPrice > 0) {
      setPrice(newPrice);
    }
  };

  const isInputValid = () => {
    return (
      carModel.length >= 2 &&
      !isNaN(price) &&
      price > 0 &&
      /^\d{11}$/.test(phoneNumber) &&
      pictures.length === maxPictures
    );
  };

  const handleSubmit = () => {
    // Validate the inputs
    if (!isInputValid()) {
      alert("Please fill in all inputs correctly.");
    } else {
      setSubmissionMessage("Submission successful");
      setCarModel("");
      setPrice("");
      setPhoneNumber("");
      setMaxPictures(1);
      setPictures([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSelectedFileName("");
    }
  };

  return (
    <CenteredContainer>
      <PaperStyled elevation={3}>
        <div className=" flex text-stone-700 font-bold justify-center">
          <Typography variant="h4" gutterBottom>
            Submit Car Information
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Car Model"
              fullWidth
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              fullWidth
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth
              value={maxPictures}
              onChange={handleMaxPicturesChange}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <MenuItem key={num} value={num}>
                  {num} Pictures
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <PictureInputContainer>
          {pictures.map((picture, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(picture)}
                alt={`Picture ${index + 1}`}
                width="100"
              />
              <IconButton
                onClick={() => handleDeletePicture(index)}
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </PictureInputContainer>
        {selectedFileName && (
          <div className="mt-2">
            <Typography variant="subtitle1">
              Selected File: {selectedFileName}
            </Typography>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const newPictures = Array.from(e.target.files);

            if (newPictures.length === 0) {
              alert("You must upload at least one picture.");
              return;
            }

            if (newPictures.length > maxPictures) {
              alert("You can't upload more pictures than the max limit.");
              return;
            }

            setPictures([...pictures, ...newPictures]);

            // Set the selectedFileName based on the uploaded file
            setSelectedFileName(newPictures[0].name);

            // Clear the file input value after a file is uploaded
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
          ref={fileInputRef} // Set the ref for the file input
        />
        <div className="mt-3">
          <ButtonStyled
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={!isInputValid()}
          >
            Submit
          </ButtonStyled>
        </div>
        {/* Display the submission message */}
        {submissionMessage && (
          <div className="text-green-600 font-bold text-center mt-3">
            {submissionMessage}
          </div>
        )}
      </PaperStyled>
    </CenteredContainer>
  );
}
