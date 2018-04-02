import React from 'react';
import {
  ButtonToolbar,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

// test
const onFrequencyChange = e => {
  console.log(e.target.value);
};

/**
 * Pure function that render props]
 * @type {React.PureComponent}
 */
export const CompoundFormComponent = props => {
  return (
    // principal, rate of interest, time period, compound frequency(yearly, half yearly etc.)
    <form>
      <FormGroup controlId="principalText" validationState={props.isValid}>
        <ControlLabel>Principal</ControlLabel>
        <FormControl
          type="number"
          value={props.principal}
          placeholder="Enter principal"
          onChange={props.handleChange}
        />
        <FormControl.Feedback />
        <HelpBlock>required positive number</HelpBlock>
      </FormGroup>

      <FormGroup controlId="rateText" validationState={props.isValid}>
        <ControlLabel>Rate of Interest (%)</ControlLabel>
        <FormControl
          type="number"
          value={props.interest}
          placeholder="Enter rate of interest"
          onChange={props.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId="timeText" validationState={props.isValid}>
        <ControlLabel>Time period (month)</ControlLabel>
        <FormControl
          type="number"
          value={props.timePeriod}
          placeholder="Enter time period"
          onChange={props.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId="compoundOption" validationState={props.isValid}>
        <ControlLabel>Compound frequency</ControlLabel>
        <FormControl
          componentClass="select"
          value={props.frequency}
          onChange={onFrequencyChange}>
          <option value="12">Yearly</option>
          <option value="6">Half Yearly</option>
          <option value="1">Monthly</option>
        </FormControl>
        <FormControl.Feedback />
      </FormGroup>

      <ButtonToolbar>
        <Button bsStyle="primary">Calculate</Button>
        <Button bsStyle="default">Reset</Button>
      </ButtonToolbar>
    </form>
  );
};
