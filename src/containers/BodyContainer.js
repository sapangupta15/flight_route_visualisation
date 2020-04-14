import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MapVisualization from "../components/MapVisualization/MapVisualization";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tableColumn: {
        width: '30vw',
        marginLeft: '2%',
        marginBottom: '1%'
    },
    mapColumn: {
        width: '90vw',
        marginLeft: '5vw',
        marginBottom: '1%'
    }

}));


const BodyContainer = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.mapColumn}>
                <MapVisualization data={props.data} />
            </div>
        </div>
    );
}

export default BodyContainer;