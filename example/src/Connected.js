import React from 'react';
import {connect} from '@alexghenderson/redux-modules';
import {module as usersModule} from './store/users';
import Form from './Form';

/* If you have decorators...
@connect({
    usersModule: usersModule
})
*/
class Connected extends React.Component {
    render() {
        const {usersModule} = this.props;
        const {users, addUser} = usersModule;
        return (
            <div>
                <h3>Connected Component</h3>
                <ul>
                    {users.map((user)=>(<li key={user.name}>{user.name}</li>))}
                </ul>
                <Form onClick={(name)=>(addUser({name}))}/>
            </div>
        );
    }
}

/* without decorators... */
export default connect({usersModule})(Connected);