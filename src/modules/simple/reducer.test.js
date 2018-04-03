import { fromJS, List } from 'immutable';
import simple from './index'; // this module

const { actions, reducer } = simple;

describe('simple/reducer - actions', () => {
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

  describe('submit calculation', () => {
    const action = actions.submit(); // with default state

    it('update result', () => {
      const next = reducer(state, action).toJS();
      expect(next.result).not.toEqual(state.get('result'));
    });

    it('length equals timePeriod - short', () => {
      const previous = state.set('timePeriod', 6);
      const next = reducer(previous, action).toJS();
      expect(next.result).toHaveLength(6);
    });

    it('length equals timePeriod - long', () => {
      const previous = state.set('timePeriod', 48);
      const next = reducer(previous, action).toJS();
      expect(next.result).toHaveLength(48);
    });

    xit('calculated actual balance', () => {
      const previous = state
        .set('timePeriod', 3)
        .set('principal', 10000)
        .set('rate', 4);

      const next = reducer(previous, action); // immutable Map
      const result = next.get('result');
      const last = result.last();
      // console.log(result.toArray());
      expect(last.balance).toEqual(10100);
    });

    it('do nothing when errors exists', () => {
      const previous = state.set('hasErrors', true);
      const next = reducer(previous, action); // immutable Map
      // compare Immutable List
      const expected = previous.get('result');
      const actual = next.get('result');
      expect(actual).toEqual(expected);
    });
  });
});
