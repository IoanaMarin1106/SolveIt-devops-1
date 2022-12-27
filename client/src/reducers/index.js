import { combineReducers } from 'redux';

import problems from './problems';
import auth from './auth';
import user from './users'
import judge0 from './judge0';
import batch from './batch';

export default combineReducers({ auth, problems, user, judge0, batch });