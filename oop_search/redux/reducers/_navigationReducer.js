import { GET_TOGGLE_NAVIGATION } from "../actions/constants";
const initialState = {
  on: false,
};
const _navigationReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_TOGGLE_NAVIGATION:
      return {
        ...state,
        on: payload.data,
      };
    default:
      return state;
  }
};
export default _navigationReducer;
