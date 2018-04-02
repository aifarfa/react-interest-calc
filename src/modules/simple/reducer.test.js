import reducer from './reducer';
import * as actions from './actions';
import { fromJS } from 'immutable';

describe('simple/reducer - actions', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: '@@INIT' })
  })

  it('has default state', () => {
    const action = { type: 'ANY' }
    const state = reducer(undefined, action).toJS()

    expect(state).toBeDefined()
  })

  it('reset state', () => {
    const action = actions.reset()
    const next = reducer(state, action).toJS()

    expect(next.principal).toEqual(1200);
    expect(next.rate).toEqual(5);
    expect(next.timePeriod).toEqual(12);
  })

  it('setPrincipal', () => {
    const action = actions.setPrincipal(777)
    const next = reducer(state, action).toJS()

    expect(next.principal).toEqual(777);
    expect(next.hasErrors).toBe(false);
  })

  it('setPrincipal: NaN', () => {
    const action = actions.setPrincipal('abc0')
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })

  it('setPrincipal: negative', () => {
    const action = actions.setPrincipal('-1')
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })

  it('setRate', () => {
    const action = actions.setRate(15.5)
    const next = reducer(state, action).toJS()

    expect(next.rate).toEqual(15.5);
    expect(next.hasErrors).toBe(false);
  })

  it('setRate: NaN', () => {
    const action = actions.setRate('-xyz')
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })

  it('setRate: n > 100', () => {
    const action = actions.setRate(100.01)
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })


  it('setRate: negative', () => {
    const action = actions.setPrincipal('-1')
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })

  it('setTimePeriod: valid', () => {
    const action = actions.setTimePeriod(18)
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(false);
  })

  it('setTimePeriod: is float', () => {
    const action = actions.setTimePeriod(5.5)
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })

  it('setTimePeriod: negative', () => {
    const action = actions.setTimePeriod(-2)
    const next = reducer(state, action).toJS()

    expect(next.hasErrors).toBe(true);
  })
})