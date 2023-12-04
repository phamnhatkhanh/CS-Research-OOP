import { combineReducers } from "redux";
import _darkModeReducer from "./_darkModeReducer";
import _navigationContentReducer from "./_navigationContentReducer";
import _navigationReducer from "./_navigationReducer";
const reducers = combineReducers({
  darkMode: _darkModeReducer,
  navigation: _navigationReducer,
  navigationContent: _navigationContentReducer,
});

export default (state, action) => reducers(state, action);
