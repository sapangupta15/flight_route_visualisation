import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: '1vw',
        marginLeft: '1vw',
        marginBottom: '1vh'
    },
    formControl: {
        minWidth: props => props.width,
    }
});

const Dropdown = (props) => {
    const classes = useStyles(props);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        props.handleValueChange(event.target.value)
    }

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">{props.label}</InputLabel>
                <Select
                    value={props.selectedValue}
                    onChange={handleChange}
                    input={<OutlinedInput labelWidth={labelWidth} name={props.label} id="outlined-select-simple" />}
                >
                    {props.filterValues.map(val => <MenuItem value={val.value}>{val.displayValue}</MenuItem>)}
                </Select>
            </FormControl>
        </form>
    );
}

export default Dropdown;