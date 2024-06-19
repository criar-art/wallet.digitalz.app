import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector((state: RootState) => state);
export const useCreateSelector: TypedUseSelectorHook<RootState> = () => useSelector;

export default store;
