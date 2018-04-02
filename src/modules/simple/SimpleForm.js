import React from "react";
import {
  ButtonToolbar,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock
} from "react-bootstrap";

/**
 * [SimpleFormComponent Pure function that render props]
 * @type {React.PureComponent}
 */
export const SimpleFormComponent = props => {
  return (
    // principal, rate of interest, time period, compound frequency(yearly, half yearly etc.)
    <form>
      <FormGroup controlId="principalText" validationState={props.isValid}>
        <ControlLabel>Principal</ControlLabel>
        <FormControl
          type="text"
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
          type="text"
          value={props.rate}
          placeholder="Enter rate of interest"
          onChange={props.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId="timeText" validationState={props.isValid}>
        <ControlLabel>Time period (month)</ControlLabel>
        <FormControl
          type="text"
          value={props.timePeriod}
          placeholder="Enter time period"
          onChange={props.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <ButtonToolbar>
        <Button bsStyle="primary" disabled={props.hasErrors}>Calculate</Button>
        <Button bsStyle="default">Reset</Button>
      </ButtonToolbar>
    </form>
  );
};
