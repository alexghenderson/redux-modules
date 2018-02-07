import {takeEvery, all, fork} from 'redux-saga/effects';
import {getSagas, createRootSaga} from '@alexghenderson/redux-modules';
import {module as usersModule} from './users';

const moduleSagas = getSagas({takeEvery, all})([usersModule]);

const sagas = [
    ...moduleSagas,
    //Any other sagas
];

export default createRootSaga({all, fork})(sagas);