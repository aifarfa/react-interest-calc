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

      <FormGroup controlId="frequency">
        <ControlLabel>When would you prefer to be paid interest?</ControlLabel>
        <FormControl
          componentClass="select"
          value={props.frequency}
          onChange={props.onFrequencyChange}>
          <option value="12">Yearly</option>
          <option value="6">Half Yearly</option>
          <option value="3">Quaterly</option>
          <option value="1">Monthly</option>
        </FormControl>
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
    onFrequencyChange: e=> dispatch(actions.setFrequency(e.target.value)),
    onPrincipalChange: e => dispatch(actions.setPrincipal(e.target.value)),
    onRateChange: e => dispatch(actions.setRate(e.target.value)),
    onTimePeriodChange: e => dispatch(actions.setTimePeriod(e.target.value)),
    onReset: e => dispatch(actions.reset()),
    onSubmit: e => dispatch(actions.submit())
  };
};

export default connect(mapState, mapDispatch)(SimpleFormComponent);
