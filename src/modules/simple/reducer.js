import Immutable from 'immutable';
import * as t from './actionTypes';
import Decimal from 'decimal.js-light';

const initialState = Immutable.fromJS({
  principal: 1200,
  rate: 5,
  timePeriod: 12,
  hasErrors: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case t.RESET:
      return initialState

    case t.SET_PRINCIPAL:
      return setPrincipal(state, action.payload)

    case t.SET_RATE:
      return setRate(state, action.payload)

    default: return state
  }
}

function setPrincipal(state, payload) {
  const setState = stateNumberSetter(state, n => isPositive(n))
  const nextState = setState('principal', payload.value)
  return nextState
}

function setRate(state, payload) {
  const setState = stateNumberSetter(state, n => isPercentage(n))
  const nextState = setState('rate', payload.value)
  return nextState
}

/**
 * curry func for state setter
 */
const stateNumberSetter = (state, validate) => (key, value) => {
  // default
  if (!value) {
    return state.set(key, 0)
  }

  const number = parseFloat(value)
  // validate
  if (!number || !validate(number)) {
    return state
      .set(key, value)
      .set('hasErrors', true)
  }

  return state.set(key, value)
}

function isPositive(value) {
  return value > 0
}

function isPercentage(value) {
  return value >= 0 && value <= 100
}
