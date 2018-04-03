import { combineReducers } from 'redux-immutable';
import simple from '../modules/simple';
import compound from '../modules/compound';

export default combineReducers({
  compound: compound.reducer,
  simple: simple.reducer
});
