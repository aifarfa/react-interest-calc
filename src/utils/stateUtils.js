import Decimal from 'decimal.js-light';
import { List } from 'immutable';

/**
 * curry function that apply different validation
 * @param  {Map} state
 * @param  {function} validate numeric validate function
 * @return {function}          apply changes to nextState
 */
export const stateNumberSetter = (state, validate) => (key, value) => {
  const number = parseFloat(value);
  const error = !number || !validate(number);
  const actual = error ? value : number;
  const next = state.set(key, actual).setIn(['errors', key], error);
  return next.set('hasErrors', hasErrors(next));
};

/**
 * apply different calculator (simple or compound)
 * @param  {function: (month, frequency) => function} timeline calculator function
 * @return {function: (state, payload) => Map}
 */
export const resultSetter = timeline => (state, payload) => {
  if (state.get('hasErrors')) {
    return state;
  }
  const month = state.get('timePeriod');
  const principal = state.get('principal');
  const rate = state.get('rate');
  const frequency = state.get('frequency');
  const getTimeline = timeline(month, frequency);
  const result = getTimeline(principal, rate);

  return state.set('result', List(result));
};

export function setPrincipal(state, payload) {
  const setState = stateNumberSetter(state, isPositive);
  const nextState = setState('principal', payload.value);
  return nextState;
}

export function setRate(state, payload) {
  const setState = stateNumberSetter(state, isPercentage);
  const nextState = setState('rate', payload.value);
  return nextState;
}

export function setTimePeriod(state, payload) {
  const setState = stateNumberSetter(state, isPositiveInt);
  const nextState = setState('timePeriod', payload.value);
  return nextState;
}

export function setFrequency(state, payload) {
  const setState = stateNumberSetter(state, isPositiveInt);
  const nextState = setState('frequency', payload.value);
  return nextState;
}

export function toggleMonthlyResult(state, payload) {
  return state.set('showMonthly', payload.value);
}

export function isPositive(value) {
  return value > 0;
}

export function isPercentage(value) {
  return value >= 0 && value <= 100;
}

export function isPositiveInt(value) {
  const num = new Decimal(value);
  return num.isPositive() && num.isInteger();
}

function hasErrors(state) {
  const errors = state.get('errors').filter(e => e);
  return errors.size > 0;
}
