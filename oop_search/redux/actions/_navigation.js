import { GET_TOGGLE_NAVIGATION } from "./constants";
export const getToggleNavigation = (value) => (dispatch) => {
  dispatch({
    type: GET_TOGGLE_NAVIGATION,
    data: value,
  });
};
