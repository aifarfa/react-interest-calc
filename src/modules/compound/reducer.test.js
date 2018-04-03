import { fromJS, List } from 'immutable';
import compound from './index'; // this module

const { actions, reducer } = compound;

describe('compound/reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: '@@INIT' });
  });

  it('has default state', () => {
    expect(state).toBeDefined();
  });

  it('reset state', () => {
    const action = actions.reset();
    const next = reducer(state, action).toJS();

    expect(next.principal).toEqual(1200);
    expect(next.rate).toEqual(5);
    expect(next.timePeriod).toEqual(12);
  });

  it('setPrincipal', () => {
    const action = actions.setPrincipal(777);
    const next = reducer(state, action).toJS();

    expect(next.principal).toEqual(777);
    expect(next.errors.principal).toBeFalsy();
    expect(next.hasErrors).toBeFalsy();
  });

  it('setPrincipal: NaN', () => {
    const action = actions.setPrincipal('abc0');
    const next = reducer(state, action).toJS();

    expect(next.errors.principal).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setPrincipal: negative', () => {
    const action = actions.setPrincipal('-1');
    const next = reducer(state, action).toJS();

    expect(next.errors.principal).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setRate', () => {
    const action = actions.setRate(15.5);
    const next = reducer(state, action).toJS();

    expect(next.rate).toEqual(15.5);
    expect(next.errors.rate).toBeFalsy();
    expect(next.hasErrors).toBeFalsy();
  });

  it('setRate: NaN', () => {
    const action = actions.setRate('-xyz');
    const next = reducer(state, action).toJS();

    expect(next.errors.rate).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setRate: n > 100', () => {
    const action = actions.setRate(100.01);
    const next = reducer(state, action).toJS();

    expect(next.errors.rate).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setRate: negative', () => {
    const action = actions.setRate(-1);
    const next = reducer(state, action).toJS();

    expect(next.errors.rate).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setTimePeriod: valid', () => {
    const action = actions.setTimePeriod(18);
    const next = reducer(state, action).toJS();

    expect(next.errors.timePeriod).toBeFalsy();
    expect(next.hasErrors).toBeFalsy();
  });

  it('setTimePeriod: is float', () => {
    const action = actions.setTimePeriod(5.5);
    const next = reducer(state, action).toJS();

    expect(next.errors.timePeriod).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setTimePeriod: negative', () => {
    const action = actions.setTimePeriod(-2);
    const next = reducer(state, action).toJS();

    expect(next.errors.timePeriod).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setTimePeriod: zero', () => {
    const action = actions.setTimePeriod(0);
    const next = reducer(state, action).toJS();

    expect(next.errors.timePeriod).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setTimePeriod: previous errors', () => {
    const previous = state.setIn(['errors', 'rate'], true); // existing errors
    const action = actions.setTimePeriod(60); // valid
    const next = reducer(previous, action).toJS();

    expect(next.errors.timePeriod).toBeFalsy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setFrequency valid', () => {
    const action = actions.setFrequency('12');
    const next = reducer(state, action).toJS();

    expect(next.frequency).toEqual(12);
    expect(next.errors.frequency).toBeFalsy();
  });

  it('setFrequency: undefined', () => {
    const action = actions.setFrequency(undefined);
    const next = reducer(state, action).toJS();

    expect(next.errors.frequency).toBeTruthy();
    expect(next.hasErrors).toBeTruthy();
  });

  it('setFrequency check previous errors', () => {
    const previous = state.setIn(['errors', 'rate'], true); // existing errors
    const action = actions.setFrequency(6);
    const next = reducer(previous, action).toJS();

    expect(next.errors.frequency).toBeFalsy();
    expect(next.hasErrors).toBeTruthy();
  });

  xdescribe('submit calculation', () => {
    // const action = actions.submit(); // with default state
  });
});
