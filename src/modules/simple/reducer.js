import Immutable from 'immutable';
import * as t from './actionTypes';

const initialState = Immutable.fromJS({
  principal: 1200,
  rateOfInterest: 5,
  timePeriod: 12,
  hasErrors: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case t.RESET:
      return initialState

    default: return state
  }
}
