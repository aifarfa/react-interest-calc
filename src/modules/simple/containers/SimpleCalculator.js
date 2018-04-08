import { connect } from 'react-redux';
import * as actions from '../actions';
import InterestCalculator from '../../../components/InterestCalculator';

const mapState = state => {
  const parent = state.get('simple');

  return {
    hasErrors: parent.get('hasErrors'),
    principal: parent.get('principal'),
    rate: parent.get('rate'),
    timePeriod: parent.get('timePeriod'),
    result: parent.get('result'),
    showMonthly: parent.get('showMonthly'),
    errors: parent.get('errors').toJS()
  };
};

const mapDispatch = dispatch => {
  return {
    onFrequencyChange: e => dispatch(actions.setFrequency(e.target.value)),
    onPrincipalChange: e => dispatch(actions.setPrincipal(e.target.value)),
    onRateChange: e => dispatch(actions.setRate(e.target.value)),
    onTimePeriodChange: e => dispatch(actions.setTimePeriod(e.target.value)),
    onToggleMonthly: e => dispatch(actions.showMonthly(e.target.checked)),
    onReset: e => dispatch(actions.reset()),
    onSubmit: e => dispatch(actions.submit())
  };
};

export default connect(mapState, mapDispatch)(InterestCalculator);
