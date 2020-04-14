import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import FilterContainer from "./FilterContainer";
import BodyContainer from "./BodyContainer";
import axios from 'axios';

import convertData from "../utils/PathDataConversionUtils";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#383838'
    },
    filter: {
        width: '100vw',
        marginTop: '6%',
    },
    body: {
        width: '100vw'
    }

}));

const SearchRoutes = () => {
    const classes = useStyles();
    const [mapData, setMapData] = useState(null)
    const [showMap, setShowMap] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSearchRoutes = (departAirport, arriveAirport, maxHalts) => {
        // axios.get('./sample_response.json')
        setLoading(true);
        setShowMap(false);
        setError(null);
        axios.get('http://localhost:5050/paths', {
            params: {
                source: departAirport,
                destination: arriveAirport,
                halts: maxHalts
        }})
            .then(response => {
                setMapData(convertData(response.data));
                setShowMap(true);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data)
                } else {
                    setError(err.message)
                }
                setLoading(false);
                console.log(err.response)
            })
    }

    let body = showMap ? (
        <BodyContainer data={mapData}/>
    ) : error !== null ?
        (<h4 style={{color: 'red'}}>{error}</h4>)
        : null;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.appBrand}>
                        Flight Search
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.filter}>
                <FilterContainer onSubmit={handleSearchRoutes}/>
            </div>
            <div className={classes.body}>
                {body}
            </div>
        </div>
    );
};

export default SearchRoutes;
