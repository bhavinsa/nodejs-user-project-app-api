import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const User = () => {
    const { auth, toggleAuth } = useContext(AuthContext);
    const authData = auth ? 'Login' : 'Not Login';

    const toggle = () => {
        toggleAuth(auth);
    }
    return (
        <div>
            User value is {authData}
            <button onClick={toggle}> ToggleAuth</button>

        </div>
    )
}
export default User;