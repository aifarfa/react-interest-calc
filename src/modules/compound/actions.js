import * as t from './actionTypes'; // from this module

export const reset = () => ({
  type: t.RESET
});

export const setPrincipal = value => ({
  type: t.SET_PRINCIPAL,
  payload: { value }
});

export const setRate = value => ({
  type: t.SET_RATE,
  payload: { value }
});

export const setTimePeriod = value => ({
  type: t.SET_TIME_PERIOD,
  payload: { value }
});

export const setFrequency = value => ({
  type: t.SET_FREQUENCY,
  payload: { value }
});

export const submit = () => ({
  type: t.SUBMIT
});
