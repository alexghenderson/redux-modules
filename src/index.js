import {connect as c} from 'react-redux';
import produce from 'immer';

const createReducer = (module) => (state = module.initial, action) => (
    module.mutations[action.type] 
    ? produce(state, (draft) => (module.mutations[action.type](draft, action))) 
    : state
)

const getActions = (module) => (module.actions);

const selectModule = (module) => (state) => (state[module.name]);

const dispatchModule = (module, dispatch) => (
    Object.keys(module.actions).reduce(
        (acc, key)=>({
            ...acc,
            [key]: (...args) => (dispatch(module.actions[key](...args))),
        }), {}
    )
);

export const getReducers = (modules) => (modules.reduce(
        (acc, module)=>({
            ...acc,
            [module.name]: createReducer(module),
        }), {}
    )
);

const connectContainer = (module) => (Component) => {
    console.log(module);
    return c(
        selectModule(module),
        (dispatch) => dispatchModule(module, dispatch),
    )(Component)
}

const Container = ({children, ...props}) => (children(props));

export const createContainer = (module) => connectContainer(module)(Container)

export const connect = (modules) => (
    c(
        (state)=>( //mapStateToProps
            Object.keys(modules).reduce(
                (acc, key)=>({
                    ...acc,
                    [key]: selectModule(modules[key])(state),
                }), {}
            ) 
        ),
        (dispatch)=>( //mapDispatchToProps
            Object.keys(modules).reduce(
                (acc, key)=>({
                    ...acc,
                    [key]: dispatchModule(modules[key], dispatch)
                }), {}
            ) 
        ),
        (state, actions, own)=>( //mergeProps
            Object.keys(modules).reduce(
                (acc, key)=>({
                    ...acc,
                    [key]: {
                        ...state[key],
                        ...actions[key],
                        ...own[key],
                    }
                }), {...own}
            )
        )
    )
)

export const createTypes = (name) => (types) => (Object.keys(types).reduce(
    (acc, type) => ({
        ...acc,
        [type]: `${name.toUpperCase()}/${types[type]}`,
    }), {}
));

export const createAction = (type, pc) => (props) => ({type, payload: pc && pc.call ? pc(props) : pc})

export const identity = (i) => (i);
