// ici j'utilise useRef pour et fait appel aux registeremail / password 
import React, { useRef, useState } from 'react'
//ici j'utilise auth pour faire appel a la base de donnée
import { auth } from "../utils/firebase.config"

const SignUp = () => {
    //ici j'utilise useRef qui permet de recupérer ce qu'est taper dans l'input
    const registerEmail = useRef();
    const registerPassword = useRef();
    const [displayName, setdisplayName] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
    try {
    //ici je crée une méthode qui permet d'interagire avec firebase
    //grace a la méthode si dessous j'arrive a crée un utilisateur
    auth.createUserWithEmailAndPassword(
        registerEmail.current.value, 
        registerPassword.current.value).then(async (userAuth) => {
            //ici j'utilise la propriété await user updateProfil pour update une donnée
            await userAuth.user.updateProfile({
                displayName,
            })
            console.log(userAuth);
            window.location.reload();
        })
    //ici dans un catch je met un consol log qui permet de voir le message d'erreur dans la console
    } catch (error){
        console.log(error.message);
    }
};

    return (
        <div>
            <div className='signup-container'>
                <div className='signup'>
                        <h3>S'inscrire</h3>
                    <form onSubmit={(e) => handleRegister(e)}>
                        
                        <input type='text' 
                        placeholder='Pseudo' 
                        required onChange={(e) => setdisplayName(e.target.value)}/>
                        
                        <input type='email' 
                        placeholder='Email' 
                        required ref={registerEmail} />

                        <input type='password' 
                        placeholder='Mot de passe' ref={registerPassword} />

                        <input type='submit' value='Valider inscription' />

                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

