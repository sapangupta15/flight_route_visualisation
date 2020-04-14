import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import countryData from '../data/countries.json'
import countryAirports from '../data/country_airports.json'
import Dropdown from "../components/Dropdown/Dropdown";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '3vw'
    },
    filterRow: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100vw',
        justifyContent: 'flex-start',
    },
    submitRow: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100vw',
        justifyContent: 'flex-start',
    },
    divider: {
      marginLeft: '1vw',
      marginRight: '1vw',
    },
    haltFilter: {
        marginLeft: '4vw',
        marginRight: '1vw'
    },
    button: {

    }

}));

const FilterContainer = (props) => {
    const classes = useStyles();
    const [allCountries, setAllCountries] = useState([]);
    const [allAirports, setAllAirports] = useState(null)
    const [departCountryAirports, setDepartCountryAirports] = useState([]);
    const [arriveCountryAirports, setArriveCountryAirports] = useState([]);
    const [departCountry, setDepartCountry] = useState('');
    const [arriveCountry, setArriveCountry] = useState('');
    const [departAirport, setDepartAirport] = useState('');
    const [arriveAirport, setArriveAirport] = useState('');
    const [maxHalts, setMaxHalts] = useState(0);
    const [disableButton, setDisableButton] = useState(true);

    const submitRequest = () => {
        props.onSubmit(departAirport, arriveAirport, maxHalts)
    }

    const haltArray = [...Array(10).keys()].map(function(elem) {
        return {
            value: elem,
            displayValue: elem,
        }
    });

    useEffect(() => {
        setAllCountries(countryData.countries.map(function(elem) {
            return {
                value: elem,
                displayValue: elem,
            }
        }));
        setAllAirports(countryAirports);

    }, [])

    useEffect(() => {
        if (departAirport && departAirport && arriveCountry && arriveAirport) {
            setDisableButton(false)
        }
    }, [departCountry, arriveCountry, departAirport, arriveAirport])

    const handleDepartureCountryChange = (val) => {
        setDepartCountry(val);
        setDepartCountryAirports(allAirports[val].map(function(elem) {
            return {
                value: elem.Airport_ID,
                displayValue: elem.Name
            }
        }));
    }

    const handleArrivalCountryChange = (val) => {
        setArriveCountry(val);
        setArriveCountryAirports(allAirports[val].map(function(elem) {
            return {
                value: elem.Airport_ID,
                displayValue: elem.Name
            }
        }));
    }

    const handleDepartureAirportChange = (val) => {
        setDepartAirport(val);
    }

    const handleArrivalAirportChange = (val) => {
        setArriveAirport(val);
    }

    const handleHaltChange = (val) => {
        setMaxHalts(val)
    }

    return (
        <div className={classes.root}>
            <div className={classes.filterRow}>
                <div>Departure</div>
                <Dropdown
                    label='Countries'
                    selectedValue={departCountry}
                    filterValues={allCountries}
                    handleValueChange={handleDepartureCountryChange}
                    width={200}
                />
                <Dropdown
                    label='Airports'
                    selectedValue={departAirport}
                    filterValues={departCountryAirports}
                    handleValueChange={handleDepartureAirportChange}
                    width={350}
                />
                <Divider orientation="vertical" className={classes.divider} />
                <div>Arrival</div>
                <Dropdown
                    label='Countries'
                    selectedValue={arriveCountry}
                    filterValues={allCountries}
                    handleValueChange={handleArrivalCountryChange}
                    width={200}
                />
                <Dropdown
                    label='Airports'
                    selectedValue={arriveAirport}
                    filterValues={arriveCountryAirports}
                    handleValueChange={handleArrivalAirportChange}
                    width={350}
                />
            </div>
            <div className={classes.submitRow}>
                <div className={classes.haltFilter}>
                    <Dropdown
                        label='Max Halts'
                        selectedValue={maxHalts}
                        filterValues={haltArray}
                        handleValueChange={handleHaltChange}
                        width={200}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.button}
                        disabled={disableButton}
                        onClick={submitRequest}>
                        Search
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default FilterContainer;