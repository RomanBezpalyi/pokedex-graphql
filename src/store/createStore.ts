import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';

import { rootReducer } from './rootReducer';

const devToolsConfig = {
  trace:      true,
  traceLimit: 25,
};

export const store = configureStore( {
  reducer:    rootReducer,
  middleware: [ReduxThunk],
  devTools:   devToolsConfig,
} );

export default store;
