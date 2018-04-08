import Immutable from 'immutable';
import * as t from './actionTypes';
import { getSimpleInterestTimeline } from '../../utils/calculator';
import {
  setPrincipal,
  setRate,
  setTimePeriod,
  setFrequency,
  toggleMonthlyResult,
  resultSetter
} from '../../utils/stateUtils';

const initialState = Immutable.fromJS({
  principal: 1200,
  rate: 5,
  timePeriod: 36,
  frequency: 12,
  result: [],
  showMonthly: false,
  hasErrors: false,
  errors: {}
});

const setResult = resultSetter(getSimpleInterestTimeline);

export default (state = initialState, action) => {
  switch (action.type) {
    case t.RESET:
      return initialState;

    case t.SET_PRINCIPAL:
      return setPrincipal(state, action.payload);

    case t.SET_RATE:
      return setRate(state, action.payload);

    case t.SET_TIME_PERIOD:
      return setTimePeriod(state, action.payload);

    case t.SET_FREQUENCY:
      return setFrequency(state, action.payload);

    case t.SHOW_MONTHLY_RESULT:
      return toggleMonthlyResult(state, action.payload);

    case t.SUBMIT:
      return setResult(state, action.payload);

    default:
      return state;
  }
};
