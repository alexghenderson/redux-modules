## Overview
Heavily inspired by redux-box, some of the ideas and methodology is shamelessly ripped from it. However, redux-modules allows easier integration into existing code. Unlike redux-box, it does not require a custom store creator and does not provide sagas (although this may be added in the future).

## Installation
Install react, redux, and react-redux:
```bash
npm install --save react redux react-redux
```

Install redux-modules:
```bash
npm install --save @alexghenderson/redux-modules
```

## Usage
redux-modules provides a method of declaring redux modules, allowing you to easily integrate them into your existing store and mapping them to your component, either through higher order components or child functions

`src/store/user/index.js`
```js
import {createTypes, createAction, createContainer} from '@alexghenderson/redux-modules';

const name = 'users'

const types = createTypes(name)({
    ADD_USER: 'ADD_USER'
});

const initial = {users: []};

const mutations = {
    [types.ADD_USER]: (state, {payload}) => (state.users.push(payload)),
};

const actions = {
    addUser: createAction(types.ADD_USER),
};

export const module = {
    name,
    initial,
    mutations,
    actions,
};

export default createContainer(module);
```
`src/store/reducers.js`
```js
import {module as userModule} from './user';

const moduleReducers = getReducers([
    userModule,
]);

const reducers = {
    //other reducers,
    ...moduleReducers,
};

export default reducers;
```

`src/store/index.js`
```js
import {createStore} from 'redux';

import reducers from './reducers';

export default () => {
    const store = createStore(reducers, {});

    return store;
};
```

Any component file (using connect)
```js
import {connect} from '@alexghenderson/redux-modules';
import {module as userModule} from 'src/store/user';

@connect({
  user: userModule,
})
class SomeComponent extends React.Component {
  render() {
    const {user} = this.props;
    const {users, addUser} = user;
    return (
      //component code
    )
  }
}
```

or, using child functions
```js
import UserModule from 'src/store/user';

const SomeComponent = () => (
  <UserModule>
    {({users, addUser})=>(
      <div>
        {users.map((user)=>(
          <span>{user.name}</span>
        ))}
        <button onClick={()=>(addUser({name: 'Jimmy'}))}>
      </div>
    )}
  </UserModule>
)
```

## Module Definitions
Modules are defined as an object with the following keys:
* `name` The name of the module
* `initial` The initial state of the module. Note: redux-modules only supports objects for module states.
* `mutations` The mutations that form the reducer. An object with the action types as the keys, and functions that transform the state as values. Note: redux-modules uses immer to maintain immutability. You can mutate the state here, it is actually a proxy so the real state isn't modified.
* `actions` The actions for the module. An object with the action names for keys and the action creators for the values. Redux-modules provides a `createAction` utility to make defining the actions a bit cleaner.

## Utility Functions
* `createTypes(moduleName)(typeMap)` Creates a type map for namespacing types. Not required, but recommended to prevent type name collisions.
* `createAction(actionType, payloadCreator)` Creates an action creator for the specified type. The payload is generated by passing the parameters to the payloadCreator function.
* `getReducers(moduleList)` Creates an object with the module names for keys and the reducer functions for values. Used to generate reducers that can be passed to combineReducers.
* `createContainer(module)` Creates a connected function-as-a-child component for a specified module.
* `connect(moduleMap)` Like react-redux connect, except takes an object with the names of the props for keys, and the modules for values. Will intelligently map the actions and state to the prop names provided. Used for creating higher-order-components.
