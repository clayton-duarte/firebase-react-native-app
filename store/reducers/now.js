import moment from 'moment';

import { CLOCK } from '../../actions/types';

const initialState = moment().format('x');

export default (state = initialState, action) => {
  switch (action.type) {
    case CLOCK:
      return moment().format('x');
    default:
      return state;
  }
};
