import { createStore, compose } from 'redux';
import rootReducer from './rootReducer';
import DevTools from '../modules/devtools';

const enhancer = compose(
  DevTools.instrument()
);

const configureStore = (initialState) => {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    // module.hot.accept('../reducers', () =>
    //   store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    // );
  }

  return store;
}

export default configureStore;