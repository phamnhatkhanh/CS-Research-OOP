"use client";
import { Provider } from "react-redux";
import { store } from "../../redux/reducers/store";

const ReduxLayout = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};
export default ReduxLayout;
