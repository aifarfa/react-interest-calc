import React from 'react';
import {
  ButtonToolbar,
  Button,
  Checkbox,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';

const getValidState = e => (e ? 'error' : null);

/**
 * Reusable saving calculator form component
 */
export default props => {
  const errors = props.errors || {};
  const validation = {
    principal: getValidState(errors.principal),
    rate: getValidState(errors.rate),
    timePeriod: getValidState(errors.timePeriod)
  };

  return (
    // principal, rate of interest, time period, compound frequency(yearly, half yearly etc.)
    <form className='spacing'>
      <FormGroup validationState={validation.principal}>
        <ControlLabel>Principal</ControlLabel>
        <FormControl
          type='number'
          value={props.principal}
          placeholder='Enter principal'
          onChange={props.onPrincipalChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup validationState={validation.rate}>
        <ControlLabel>Rate of Interest (%)</ControlLabel>
        <FormControl
          type='number'
          value={props.rate}
          placeholder='Enter rate of interest'
          onChange={props.onRateChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup validationState={validation.timePeriod}>
        <ControlLabel>Time period (month)</ControlLabel>
        <FormControl
          type='number'
          value={props.timePeriod}
          placeholder='Enter time period'
          onChange={props.onTimePeriodChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup controlId='frequency'>
        <ControlLabel>When would you prefer to be paid interest?</ControlLabel>
        <FormControl
          componentClass='select'
          value={props.frequency}
          onChange={props.onFrequencyChange}>
          <option value='12'>Yearly</option>
          <option value='6'>Half Yearly</option>
          <option value='3'>Quaterly</option>
          <option value='1'>Monthly</option>
        </FormControl>
      </FormGroup>

      <Checkbox checked={props.showMonthly} onChange={props.onToggleMonthly}>show result monthly?</Checkbox>

      <ButtonToolbar>
        <Button
          bsStyle='primary'
          disabled={props.hasErrors}
          onClick={props.onSubmit}>
          Calculate
        </Button>
        <Button bsStyle='default' onClick={props.onReset}>
          Reset
        </Button>
      </ButtonToolbar>
    </form>
  );
};
