import React from 'react';
import SimpleFormComponent from './SimpleForm';
import ResultTable from './ResultTable';
import { Row, Col } from 'react-bootstrap';

export default class InterestCalculator extends React.PureComponent {
  render() {
    const props = this.props;

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
    );
  }
}
