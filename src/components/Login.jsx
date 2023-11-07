import { useState, useEffect } from "react";
import { Container, Paper, TextField, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const CenteredContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5),
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  className: "rounded-md",
}));

const InputStyled = styled(TextField)(({ theme }) => ({}));

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiEmail, setApiEmail] = useState(""); // To store the email fetched from the API
  const [apiPassword, setApiPassword] = useState(""); // To store the password fetched from the API

  useEffect(() => {
    fetch("https://user-0ahr.onrender.com/user")
      .then((response) => response.json())
      .then((data) => {
        setApiEmail(data.email);
        setApiPassword(data.password);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
      });
  }, []);
  const handleLogin = () => {
    if (email === apiEmail && password === apiPassword) {
      navigate("/car-detail");
    } else {
      setError("Invalid credentials");
    }
  };
  console.log(email, password);
  return (
    <CenteredContainer>
      <PaperStyled elevation={3}>
        <div className="flex justify-center items-center">
          <h1 className="mb-4 font-bold uppercase text-3xl text-stone-700">
            Please Login
          </h1>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputStyled
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputStyled
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <ButtonStyled
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Log In
        </ButtonStyled>
      </PaperStyled>
    </CenteredContainer>
  );
}

export default Login;
