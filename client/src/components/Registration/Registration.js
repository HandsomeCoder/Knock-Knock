import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Avatar,
} from "@material-ui/core";
import { theme } from "./../../themes/theme";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { register } from "../../store/utils/thunkCreators";
import useStyles from "../../hooks/use-styles";

const styles = {
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#dc004e",
  },
  form: {
    width: '500px',
    marginTop: theme.spacing(1),
  },
  formControl: {
    display: "block"
  },
  registerLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}

const Registration = () => {
  const classes = useStyles(styles);

  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    dispatch(register({ username, email, password }));
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" noValidate onSubmit={handleRegister} className={classes.form}>
        
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                margin="normal"
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                autoFocus
                fullWidth
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                margin="normal"
                label="E-mail"
                aria-label="e-mail"
                type="email"
                name="email"
                fullWidth
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} error={!!formErrorMessage.confirmPassword}>
              <TextField
                variant="outlined"
                margin="normal"
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                fullWidth
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={!!formErrorMessage.confirmPassword}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                fullWidth
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="subtitle1" className={classes.registerLink}
              onClick={() => history.push("/login")}>
              {"Already have an account? Log In"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Registration;
