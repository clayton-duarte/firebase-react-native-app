import { NOTIFICATION_TOKEN } from '../../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
