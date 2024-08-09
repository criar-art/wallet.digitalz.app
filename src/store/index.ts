import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistConfig, persistReducer } from "redux-persist";
import commonSlice from "./commonSlice";
import expenseSlice from "./expenseSlice";
import entrySlice from "./entrySlice";
import investmentSlice from "./investmentSlice";
import userSlice from "./userSlice";
import modalsSlice from "./modalsSlice";
import budgetSlice from "./budgetSlice";
import utils from "@utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createPersistConfig = (key: string): PersistConfig<any> => ({
  key,
  storage: AsyncStorage,
  transforms: [
    {
      in: (state: any) => utils.encryptData(state),
      out: (state: any) => utils.decryptData(state),
    },
  ],
});

const commonPersistConfig = createPersistConfig("commonState");
const expensePersistConfig = createPersistConfig("expenseState");
const entryPersistConfig = createPersistConfig("entryState");
const investmentPersistConfig = createPersistConfig("investmentState");
const userPersistConfig = createPersistConfig("userState");
const modalsPersistConfig = createPersistConfig("modalsState");
const budgetPersistConfig = createPersistConfig("budgetState");

const rootReducer = combineReducers({
  commonState: persistReducer(commonPersistConfig, commonSlice),
  expenseState: persistReducer(expensePersistConfig, expenseSlice),
  entryState: persistReducer(entryPersistConfig, entrySlice),
  investmentState: persistReducer(investmentPersistConfig, investmentSlice),
  userState: persistReducer(userPersistConfig, userSlice),
  modalsState: persistReducer(modalsPersistConfig, modalsSlice),
  budgetState: persistReducer(budgetPersistConfig, budgetSlice),
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
