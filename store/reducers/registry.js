import { REGISTRY } from '../../actions/types';

const initialState = {
  history: {
    loading: true,
  },
  profile: {
    journey: 8,
    lunch: 60,
    cash: 0,
  },
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
