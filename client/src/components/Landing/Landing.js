import React from "react";
import {
    Paper, Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from './../../assets/images/background.jpg';
import bannerIcon from './../../assets/icons/knock-knock.svg';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    greyLayer: {
        backgroundColor: "black",
        position: "absolute",
        display: "block",
        width: "100%",
        height: "100%",
        opacity: "0.5"
    },
    image: {
        backgroundImage: `linear-gradient(0deg, rgb(0 0 0 / 65%), hsl(215deg 63% 85% / 50%)), url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        height: "inherit"
    },
    banner: {
        display: "inline-flex",
        position: "relative",
        top: "100px",
        left: "100px"
    },
    bannerIcon: {
        backgroundImage: `url(${bannerIcon})`,
        width: "88px",
        height: "88px",
        marginRight: "25px"
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
                <section className={classes.banner}>
                    <section className={classes.bannerIcon}>
                    </section>
                    <section>
                        <Typography variant="h3">
                            Knock Knock
                        </Typography>
                        <Typography variant="h5">
                            Let's Knock
                        </Typography>
                    </section>

                </section>
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
