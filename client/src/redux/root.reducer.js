import { combineReducers } from 'redux';
import { reminderReducer } from './reminder';
import { toastReducer } from './toast';

import { reducer as formReducer } from "redux-form"; //SAYING use redux form reducer as reducer

const rootReducer = combineReducers({
  form: formReducer,
  reminder: reminderReducer,
  toast: toastReducer,
});


export default rootReducer;