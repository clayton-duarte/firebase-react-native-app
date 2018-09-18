import { REGISTRY } from '../../actions/types';

const initialState = {
  history: {},
  hours: [],
  days: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTRY:
      return action.payload;
    default:
      return state;
  }
};
