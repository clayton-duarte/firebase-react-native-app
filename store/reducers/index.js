import { combineReducers } from 'redux';

import registry from './registry';
import auth from './auth';

export default combineReducers({
  auth, registry,
});
