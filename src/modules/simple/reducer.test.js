import reducer from './reducer';
import * as actions from './actions';
import { fromJS } from 'immutable';

describe('simple/reducer - actions', () => {

  it('has default state', () => {
    const action = { type: 'ANY' }
    const state = reducer(undefined, action).toJS()

    expect(state).toBeDefined()
  })

  it('reset state', () => {
    const state = fromJS({
      principal: 999,
      rateOfInterest: 9,
      timePeriod: 15
    })
    const action = actions.reset()
    const next = reducer(state, action).toJS()

    expect(next.principal).toEqual(1200);
    expect(next.rateOfInterest).toEqual(5);
    expect(next.timePeriod).toEqual(12);
  })
})