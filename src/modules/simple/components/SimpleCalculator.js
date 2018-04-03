import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SimpleFormComponent from '../../../components/SimpleForm';
import ResultTable from '../../../components/ResultTable';

import { Row, Col } from 'react-bootstrap';

export class SimpleCalculator extends React.PureComponent {
  render() {
    const props = this.props

    return (
      <Row>
        <Col sm={12} md={6}>
          {/* No spread opearator `...props` in ES6!? T_T */}
          <SimpleFormComponent
            errors={props.errors}
            hasErrors={props.hasErrors}
            principal={props.principal}
            rate={props.rate}
            timePeriod={props.timePeriod}
            frequency={props.frequency}
            onFrequencyChange={props.onFrequencyChange}
            onPrincipalChange={props.onPrincipalChange}
            onRateChange={props.onRateChange}
            onReset={props.onReset}
            onSubmit={props.onSubmit}
            onTimePeriodChange={props.onTimePeriodChange}
          />
        </Col>
        <Col sm={12} md={6}>
          <ResultTable result={props.result} />
        </Col>
      </Row>
    )
  }
}

const mapState = state => {
  const parent = state.get('simple');

  return {
    hasErrors: parent.get('hasErrors'),
    principal: parent.get('principal'),
    rate: parent.get('rate'),
    timePeriod: parent.get('timePeriod'),
    result: parent.get('result')
  };
};

const mapDispatch = dispatch => {
  return {
    onFrequencyChange: e => dispatch(actions.setFrequency(e.target.value)),
    onPrincipalChange: e => dispatch(actions.setPrincipal(e.target.value)),
    onRateChange: e => dispatch(actions.setRate(e.target.value)),
    onTimePeriodChange: e => dispatch(actions.setTimePeriod(e.target.value)),
    onReset: e => dispatch(actions.reset()),
    onSubmit: e => dispatch(actions.submit())
  };
};

export default connect(mapState, mapDispatch)(SimpleCalculator);
