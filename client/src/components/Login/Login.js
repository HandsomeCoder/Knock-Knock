import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    Avatar,
    FormControl
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { theme } from "./../../themes/theme";
import { login } from "../../store/utils/thunkCreators";
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


const Login = (props) => {
    const classes = useStyles(styles);

    const history = useHistory();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        dispatch(login({ username, password }));
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
                Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} className={classes.form}>
                <FormControl className={classes.formControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                        id="username"
                        required
                        fullWidth
                        autoFocus
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        aria-label="password"
                        label="Password"
                        name="password"
                        type="password"
                        id="password"
                        required
                        fullWidth
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Typography variant="subtitle1" className={classes.registerLink}
                            onClick={() => history.push("/register")}>
                            {"Don't have an account? Register"}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Login;
