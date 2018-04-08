import React from 'react';
import SimpleFormComponent from './SimpleForm';
import ResultTable from './ResultTable';
import { Row, Col } from 'react-bootstrap';

export default props => {
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
          showMonthly={props.showMonthly}
          onFrequencyChange={props.onFrequencyChange}
          onPrincipalChange={props.onPrincipalChange}
          onRateChange={props.onRateChange}
          onReset={props.onReset}
          onSubmit={props.onSubmit}
          onTimePeriodChange={props.onTimePeriodChange}
          onToggleMonthly={props.onToggleMonthly}
        />
      </Col>
      <Col sm={12} md={6}>
        <ResultTable result={props.result} monthly={props.showMonthly} />
      </Col>
    </Row>
  );
};
