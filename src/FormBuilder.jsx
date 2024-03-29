import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const FormBuilder = ({ fields, options }) => {
  const elNames = fields.map((fi) => fi.name);
  const initialValNames = fields.map((fi) => fi.initialValue);
  const initialState = {};
  elNames.map((eln, id) => {
    return (initialState[eln] = initialValNames[id] || false);
  });
  const [values, setValues] = useState(initialState);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedHour, setSelectedHour] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const handleChange = (event) => {
    let { value } = event.target;
    if (event.target.type === `checkbox`) {
      value = event.target.checked;
    }
    setValues({ ...values, [event.target.name]: value });
  };
  const formElements = [];
  fields.map((field) => {
    switch (field.type) {
      case `select`:
        formElements.push(
          <FormControl key={field.id}>
            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
            <Select
              value={values[field.name]}
              onChange={handleChange}
              inputProps={{
                name: field.name,
                id: field.id,
              }}
            >
              {field.options.map((item) => (
                <MenuItem value={item.value} key={item.value + field.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{field.helperText || null}</FormHelperText>
          </FormControl>
        );
        break;
      case `checkbox`:
        formElements.push(
          <FormControlLabel
            control={
              <Checkbox
                checked={!!values[field.name]}
                onChange={handleChange}
                value={values[field.name]}
                color="primary"
                name={field.name}
                labelplacement={field.position || `end`}
              />
            }
            key={field.id}
            label={field.label}
          />
        );
        break;

      default:
        formElements.push(
          <TextField
            id={field.id}
            label={field.label}
            value={values[field.name]}
            name={field.name}
            type={field.inputType}
            onChange={handleChange}
            margin="normal"
            key={field.id}
          />
        );
        break;
    }
  });
  let formButton = null;
  if (options.button) {
    formButton = (
      <Button
        variant="contained"
        onClick={
          options.button.onClick !== undefined
            ? options.button.onClick
            : () => {
                console.log(values, selectedDate, selectedHour);
              }
        }
      >
        {options.button.label}
      </Button>
    );
  }
  return (
    <form>
      {formElements}
      {formButton}
    </form>
  );
};

export default FormBuilder;
