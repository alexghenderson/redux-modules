import {getSagas, createRootSaga} from '@alexghenderson/redux-modules/saga';
import {module as usersModule} from './users';

const moduleSagas = getSagas([usersModule]);

const sagas = [
    ...moduleSagas,
    //Any other sagas
];

export default createRootSaga(sagas);