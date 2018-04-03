import Immutable from 'immutable';
import * as t from './actionTypes'; // it's compound/actionTypes
import { getCompoundInterestTimeline } from '../../utils/calculator';
import {
  setPrincipal,
  setRate,
  setTimePeriod,
  setFrequency,
  resultSetter
} from '../../utils/stateUtils';

const initialState = Immutable.fromJS({
  principal: 1200,
  rate: 5,
  timePeriod: 12,
  frequency: 6,
  result: [],
  hasErrors: false,
  errors: {}
});

const setResult = resultSetter(getCompoundInterestTimeline);

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
      return setResult(state, action.payload);

    default:
      return state;
  }
};
