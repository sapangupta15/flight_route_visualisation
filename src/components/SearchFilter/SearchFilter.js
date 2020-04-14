import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from "../Dropdown/Dropdown";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    column: {
        marginLeft: '3%',
        marginBottom: '1%'
    }

}));


const SearchFilter = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.column}>
                <Dropdown
                    label='Countries'
                    selectedValue={props.selectedCountry}
                    filterValues={props.countryValues}
                    handleValueChange={props.handleCountryChange}  />
            </div>
            <div className={classes.column}>
                <Dropdown
                    label='Airports'
                    selectedValue={props.selectedAirport}
                    filterValues={props.countryAirportValues}
                    handleValueChange={props.handleAirportChange} />
            </div>
        </div>
    )
}

export default SearchFilter;