import React, { useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'

const ConnectModal = () => {
    const [signUp, setsignUp] = useState(true);


    return (
        // ici je crée une ternaire avec du style conditionnel pour paramettrer le style des boutons
        <div className='connect-modal'>
            <div className='header-btn'>
                <button style={{background: signUp ? 'rgb(10,185,28)' : 'rgb(4,139,154)'}} 
                onClick={() => setsignUp(true)}>S'inscrire</button>


                <button style={{background: signUp ? 'rgb(4,139,154)' : 'rgb(10,185,28)'}} 
                onClick={() => setsignUp(false)}>Se connecter</button>
            </div>
            {signUp ? <SignUp /> : <Login />}
        </div>
    );
};

export default ConnectModal;