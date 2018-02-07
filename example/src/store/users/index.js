import {createTypes, createAction, createContainer} from '@alexghenderson/redux-modules';
import {call} from 'redux-saga/effects';

const name = 'users';

const types = createTypes(name)({
    ADD_USER: 'ADD_USER',
})

const initial = {users: []};

const mutations = {
    [types.ADD_USER]: (state, {payload})=>{console.log(payload); state.users.push(payload)},
};

const actions = {
    addUser: createAction(types.ADD_USER, (user)=>({name: user.name})),
};

const sagas = {
    [types.ADD_USER]: function*(action) {
        yield call(window.alert, `Added user ${action.payload.name}`);
    },
}

export const module = {
    name,
    initial,
    mutations,
    actions,
    sagas,
};

export default createContainer(module);