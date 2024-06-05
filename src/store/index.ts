import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistConfig, persistReducer } from "redux-persist";
import commonSlice from "./commonSlice";
import expenseSlice from "./expenseSlice";
import entrySlice from "./entrySlice";
import investmentSlice from "./investmentSlice";
import userSlice from "./userSlice";
import modalsSlice from "./modalsSlice";
import utils from "@utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createPersistConfig = (
  key: string,
  crypto: string = ""
): PersistConfig<any> => ({
  key,
  storage: AsyncStorage,
  transforms: [
    {
      in: (state: any) =>
        crypto ? utils.encryptData(state) : JSON.stringify(state),
      out: (state: any) =>
        crypto ? utils.decryptData(state) : JSON.parse(state),
    },
  ],
});

const commonPersistConfig = createPersistConfig("commonState");
const expensePersistConfig = createPersistConfig("expenseState", "secure");
const entryPersistConfig = createPersistConfig("entryState", "secure");
const investmentPersistConfig = createPersistConfig("investmentState", "secure");
const userPersistConfig = createPersistConfig("userState");
const modalsPersistConfig = createPersistConfig("modalsState");

const rootReducer = combineReducers({
  commonState: persistReducer(commonPersistConfig, commonSlice),
  expenseState: persistReducer(expensePersistConfig, expenseSlice),
  entryState: persistReducer(entryPersistConfig, entrySlice),
  investmentState: persistReducer(investmentPersistConfig, investmentSlice),
  userState: persistReducer(userPersistConfig, userSlice),
  modalsState: persistReducer(modalsPersistConfig, modalsSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
