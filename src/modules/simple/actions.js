import * as t from './actionTypes'

export const reset = () => ({
  type: t.RESET,
})

export const setPrincipal = (value) => ({
  type: t.SET_PRINCIPAL,
  payload: { value }
})