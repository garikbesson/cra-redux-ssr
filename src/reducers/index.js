import { combineReducers } from 'redux';
import { appReducer } from './appReducers';
import _ from 'lodash';

const defaultState = {
    lastAction: { type: 'init' },
};

const lastAction = (state, action) => _.merge({}, action);

const allReducers = combineReducers({
    lastAction,
    app: appReducer,
});

export default allReducers;