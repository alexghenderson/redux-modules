import { combineReducers } from 'redux';
import {getReducers} from '@alexghenderson/redux-modules';
import {module as usersModule} from './users';

const moduleReducers = getReducers([usersModule]);

const reducers = {
    ...moduleReducers,
};

export default combineReducers(reducers);