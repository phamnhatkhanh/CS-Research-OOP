import { SET_DARKMODE } from "./constants";
export const getToggleDarkMode = (value) => (dispatch) => {
  dispatch({
    type: SET_DARKMODE,
    data: value,
  });
};
