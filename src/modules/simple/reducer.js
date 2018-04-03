import Immutable from 'immutable';
import * as t from './actionTypes';
import { getSimpleInterestTimeline } from '../../utils/calculator';
import {
  setPrincipal,
  setRate,
  setTimePeriod,
  setFrequency
} from '../../utils/stateUtils';

const initialState = Immutable.fromJS({
  principal: 1200,
  rate: 5,
  timePeriod: 12,
  frequency: 12,
  result: [],
  hasErrors: false,
  errors: {}
});

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

    case t.SUBMIT:
      return updateResult(state, action.payload);

    default:
      return state;
  }
};

function updateResult(state, payload) {
  if (state.get('hasErrors')) {
    return state;
  }
  const month = state.get('timePeriod');
  const principal = state.get('principal');
  const rate = state.get('rate');
  const frequency = state.get('frequency');
  const getTimeline = getSimpleInterestTimeline(month, frequency);
  const result = getTimeline(principal, rate);

  return state.set('result', Immutable.List(result));
}
