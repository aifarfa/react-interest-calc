import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  principal: 1200,
  rate: 5,
  timePeriod: 18,
  frequency: 6,
  result: [],
  hasErrors: false,
  errors: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
