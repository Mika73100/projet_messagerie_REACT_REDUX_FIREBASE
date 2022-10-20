import React, { useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'

const ConnectModal = () => {
    //ici je passe par setsignUP qui est une fonction qui va me permettre de faire evolué le state sans le changer directement.
    //si signUP est sur true alors on souhaite s'inscrire, s'il est sur false alors nous devons nous connecter.
    const [signUp, setsignUp] = useState(true);


    return (
        // ici je crée une ternaire avec du style conditionnel pour paramettrer le style des boutons
        //ici je demande a la ternaire ? dit moi si signUp est sur true alors affiche du vert.
        //sinon affiche du rouge.

        //donc de façon conditionnel j'affiche le composant qui m'intéresse, signUP ou Login
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