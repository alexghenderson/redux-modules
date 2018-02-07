import {createTypes, createAction, createContainer} from '@alexghenderson/redux-modules';

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

export const module = {
    name,
    initial,
    mutations,
    actions,
};

export default createContainer(module);