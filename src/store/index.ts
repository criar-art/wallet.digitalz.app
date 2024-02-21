import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import * as SecureStore from "expo-secure-store";

import commonSlice from "./commonSlice";

function createSecureStorage(options: any = {}) {
  const replaceCharacter = options.replaceCharacter || "_";
  const replacer = options.replacer || defaultReplacer;

  return {
    getItem: (key: string) =>
      SecureStore.getItemAsync(replacer(key, replaceCharacter), options),
    setItem: (key: string, value: string) =>
      SecureStore.setItemAsync(replacer(key, replaceCharacter), value, options),
    removeItem: (key: string) =>
      SecureStore.deleteItemAsync(replacer(key, replaceCharacter), options),
  };
}

const defaultReplacer = (key: string, replaceCharacter: any) =>
  key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);

const persistConfig = {
  key: "root",
  storage: createSecureStorage(),
};

export const rootReducers = combineReducers({
  commonState: commonSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
