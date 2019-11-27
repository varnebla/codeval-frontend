import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import history from '../history';

import reducers from './rootReducer';

export default createStore(
  reducers(history),
  composeWithDevTools(applyMiddleware(
    //WE APPLY EXTRA ARGUMENT TO HAVE IT INJECTED IN ALL DISPATCH
    thunk.withExtraArgument(history), 
    routerMiddleware(history))
  )
);