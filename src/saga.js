import {all, fork, takeEvery} from 'redux-saga/effects';

const createSagas = (module) => {
    return function*() {
        if(module.sagas) {
            yield all(Object.keys(module.sagas).map(
                (name)=>(
                    takeEvery(name, module.sagas[name])
                )
            ))
        }
    }
};

export const getSagas = (modules) => {
    if(!Array.isArray(modules)) {
        throw new Error('getSagas modules parameter must be an array');
    };
    return modules.map((module)=>(createSagas((module))));
};

export const createRootSaga = (sagas) => {
    if(!Array.isArray(sagas)) {
        throw new Error('createRootSaga sagas parameter must be an array');
    }
    return function*() {
        yield all(
            sagas.map((saga)=>(fork(saga)))
        );
    }
};