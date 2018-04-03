import Decimal from 'decimal.js-light';

/**
 * curry function that apply different validation
 * @param  {Map} state
 * @param  {function} validate numeric validate function
 * @return {function}          apply changes to nextState
 */
export const stateNumberSetter = (state, validate) => (key, value) => {
  const number = parseFloat(value);
  const error = !number || !validate(number);
  const next = state.set(key, number).setIn(['errors', key], error);
  return next.set('hasErrors', hasErrors(next));
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
