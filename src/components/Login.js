import React, {useRef, useState} from 'react'

const Login = () => {
    const loginEmail = useRef();
    const loginPassword = useRef();
    const [error, setError]= useState(false);

    const handleLogin = async (e) => {
        //ne fait pas ton comportement par default qui est de changer de page
        e.preventDefault()

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail.current.value,
                loginPassword.current.value
            );
            console.log(user);
        }   catch (error) {
            console.log(error.message);
            //ici on met l'erreur du formulaire
            setError(true);
        }
    };

    return (
        <div className='login-container'>
            <div className='login'>
                <h3>Se connecter</h3>
                <form className='form-login' onSubmit={e => handleLogin(e)}>
                    <input type='email' placeholder='Email' required />
                    <input type='password' placeholder='Mot de passe' required />
                    <input type='submit' value='Se connecter' />
                    <span>{error && 'Le mail ou le mot de passe ne correspondent pas'}</span>
                </form>
            </div>
        </div>
    );
};

export default Login;
