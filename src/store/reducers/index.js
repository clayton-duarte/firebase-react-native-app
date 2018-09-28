import { combineReducers } from 'redux';

import notification from './notification';
import registry from './registry';
import auth from './auth';
import now from './now';

export default combineReducers({
  auth, registry, now, notification,
});
