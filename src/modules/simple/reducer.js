import Immutable from 'immutable';
import * as t from './actionTypes';
import Decimal from 'decimal.js-light';
import { getSimpleInterestTimeline } from '../../services/interest-utils';

const initialState = Immutable.fromJS({
  principal: 1200,
  rate: 5,
  timePeriod: 12,
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

function setPrincipal(state, payload) {
  const setState = stateNumberSetter(state, isPositive);
  const nextState = setState('principal', payload.value);
  return nextState;
}

function setRate(state, payload) {
  const setState = stateNumberSetter(state, isPercentage);
  const nextState = setState('rate', payload.value);
  return nextState;
}

function setTimePeriod(state, payload) {
  const setState = stateNumberSetter(state, isPositiveInt);
  const nextState = setState('timePeriod', payload.value);
  return nextState;
}

function setFrequency(state, payload) {
  const setState = stateNumberSetter(state, isPositiveInt);
  const nextState = setState('frequency', payload.value);
  return nextState;
}

function updateResult(state, payload) {
  if (state.get('hasErrors')) {
    return state;
  }
  const month = state.get('timePeriod');
  const principal = state.get('principal');
  const rate = state.get('rate');
  const frequency = 1; // TODO
  const getTimeline = getSimpleInterestTimeline(month, frequency);
  const result = getTimeline(principal, rate);

  return state.set('result', Immutable.List(result));
}

/**
 * curry function for state setter
 */
const stateNumberSetter = (state, validate) => (key, value) => {
  const number = parseFloat(value);
  const error = !number || !validate(number);
  const next = state.set(key, value).setIn(['errors', key], error);
  return next.set('hasErrors', hasErrors(next));
};

function isPositive(value) {
  return value > 0;
}

function isPercentage(value) {
  return value >= 0 && value <= 100;
}

function isPositiveInt(value) {
  const num = new Decimal(value);
  return num.isPositive() && num.isInteger();
}

function hasErrors(state) {
  const errors = state.get('errors').filter(e => e);
  return errors.size > 0;
}
