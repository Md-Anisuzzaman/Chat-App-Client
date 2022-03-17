import React, { useState } from 'react';
import './Join.css'
import logo from '../../images/logo.png'
    ;
import { Link } from 'react-router-dom';
let user;

const Join = () => {

    const [name, setname] = useState('');

    const handleUser = () => {
        user = document.getElementById('joininput').value;
        document.getElementById('joininput').value = "";
    };

    const handleLogin = (e) => {
       
        if (!name) {
         e.preventDefault();
        } else
        return null;
    };
    return (
        <div className='joinPage'>

            <div className="joinContainer">
                <img src={logo} alt="" />
                <h1>Feedo<span>Chat</span></h1>
                <input onChange={(e) => setname(e.target.value)} type="text" id="joininput" placeholder='Enter your name' />
                <Link onClick={handleLogin} to='/chat'> <button onClick={handleUser} className='joinbtn' type="submit">Log In</button> </Link>
            </div>

        </div>
    );
};

export default Join;
export { user };