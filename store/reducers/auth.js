import { LOG_IN, LOG_OUT } from '../../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.payload.user };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
