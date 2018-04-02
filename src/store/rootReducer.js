import { combineReducers } from 'redux-immutable';
import simple from '../modules/simple';

export default combineReducers({
  compound: (state = {}, action) => state, // TODO: implement module
  simple: simple.reducer,
})
