import { combineReducers, configureStore } from '@reduxjs/toolkit'
import activeUsersReducers from './features/activeUsersSlice'
import { reduxSlice } from './ReduxSlice';
import { UsersSlice } from './features/userSlice';
import { gameSlice } from './features/gameorderSlice';

const rootReducer = combineReducers({
  activeUsers: activeUsersReducers,
  globlestate: reduxSlice.reducer,
  user: UsersSlice.reducer,
  game: gameSlice.reducer
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check if needed
      }),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
