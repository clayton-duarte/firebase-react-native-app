import { combineReducers } from 'redux';

import registry from './registry';
import auth from './auth';
import now from './now';

export default combineReducers({
  auth, registry, now,
});
