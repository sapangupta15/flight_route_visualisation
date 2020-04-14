import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        zIndex: '5000',
    },
}));

export default function LinearProgressBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress color="secondary" />
        </div>
    );
}