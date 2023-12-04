import { SET_NAVIGATION_CONTENT } from "../actions/constants";
const initialState = {
  phanLoai: null,
  chuongHoc: null,
  phanMuc: null,
  baiHoc: null,
};
const _navigationContentReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_NAVIGATION_CONTENT:
      return {
        ...state,
        phanLoai: payload.data.phanLoai,
        chuongHoc: payload.data.chuongHoc,
        phanMuc: payload.data.phanMuc,
        baiHoc: payload.data.baiHoc,
      };
    default:
      return state;
  }
};
export default _navigationContentReducer;
