import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './root.reducer';

export const configureStore = () => {
  const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
  return reduxStore;
};

export const store = configureStore();
