import React from 'react';
import UsersModule from './store/users';
import Form from './Form';

class FunctionChild extends React.Component {
    render() {
        return (
        <UsersModule>
        {({users, addUser})=>(
            <div>
                <h3>Function-as-a-child Component</h3>
                <ul>
                    {users.map((user)=>(<li key={user.name}>{user.name}</li>))}
                </ul>
                <Form onClick={(name)=>(addUser({name}))}/>
            </div>
        )}
        </UsersModule>
        );
    }
}

export default FunctionChild;