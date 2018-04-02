import React from 'react';
import {
  ButtonToolbar,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../actions';

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
          type="number"
          value={props.principal}
          placeholder="Enter principal"
          onChange={props.onPrincipalChange}
        />
        <FormControl.Feedback />
        <HelpBlock>required positive number</HelpBlock>
      </FormGroup>

      <FormGroup controlId="rateText" validationState={props.isValid}>
        <ControlLabel>Rate of Interest (%)</ControlLabel>
        <FormControl
          type="number"
          value={props.rate}
          placeholder="Enter rate of interest"
          onChange={props.onRateChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId="timeText" validationState={props.isValid}>
        <ControlLabel>Time period (month)</ControlLabel>
        <FormControl
          type="number"
          value={props.timePeriod}
          placeholder="Enter time period"
          onChange={props.onTimePeriodChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <ButtonToolbar>
        <Button
          bsStyle="primary"
          disabled={props.hasErrors}
          onClick={props.onSubmit}>
          Calculate
        </Button>
        <Button bsStyle="default" onClick={props.onReset}>
          Reset
        </Button>
      </ButtonToolbar>
    </form>
  );
};

const mapState = state => {
  const parent = state.get('simple');

  return {
    hasErrors: parent.get('hasErrors'),
    principal: parent.get('principal'),
    rate: parent.get('rate'),
    timePeriod: parent.get('timePeriod')
  };
};

const mapDispatch = dispatch => {
  return {
    onPrincipalChange: e => dispatch(actions.setPrincipal(e.target.value)),
    onRateChange: e => dispatch(actions.setRate(e.target.value)),
    onTimePeriodChange: e => dispatch(actions.setTimePeriod(e.target.value)),
    onReset: e => dispatch(actions.reset())
  };
};

export default connect(mapState, mapDispatch)(SimpleFormComponent);
