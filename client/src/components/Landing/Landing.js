import React from "react";
import {
    Paper
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from './../../assets/images/background.jpg';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "inherit"
    },
    paperHolder: {
        display: "flex",
        alignItems: "center",
        minHeight: "88%",
        position: "absolute",
        right: "10%",
        top: "6%",
        borderRadius: "10px"
    }
}));


const Landing = (props) => {
    const classes = useStyles();


    const isFetching = useSelector((state) => state.user.isFetching);

    return (
        <section className={classes.root}>
            <section className={classes.image}>
                {!isFetching &&
                    <Paper elevation={6} square className={classes.paperHolder}>
                        {props.children}
                    </Paper>
                }
            </section>
        </section>
    );
};

export default Landing;
