import { SET_NAVIGATION_CONTENT } from "./constants";
export const setNavigationContent = (value) => (dispatch) => {
  dispatch({
    type: SET_NAVIGATION_CONTENT,
    data: value,
  });
};
