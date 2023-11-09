import { configureStore } from "@reduxjs/toolkit"; //빈 store를 생성하고 내보냄
import testReducer from "./testSlice";

const store = configureStore({
  reducer: {
    counter: testReducer,
  },
});

export default store;
