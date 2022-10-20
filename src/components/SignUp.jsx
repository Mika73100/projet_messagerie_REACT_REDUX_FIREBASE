// ici j'utilise useRef pour et fait appel aux registeremail / password 
import React, { useRef, useState } from 'react'
//ici j'utilise auth pour faire appel a la base de donnée
import { auth } from "../utils/firebase.config"

const SignUp = () => {
    //ici j'utilise useRef qui permet de recupérer ce qu'est taper dans l'input et de les envoyers dans ma base de données
    const registerEmail = useRef();
    const registerPassword = useRef();
    const [displayName, setDisplayName] = useState("");

    //ici je lance la fonction handleRegister qui signifie : gère l'inscription, il prend en compte sont parametre évènement (e)
    const handleRegister = (e) => {
        //cette fonction permet de ne pas recharger le formulaire.
        e.preventDefault();
        //ici je crée une méthode qui permet d'interagire avec firebase car j'appel auth.
        //grace a la méthode si dessous j'arrive a crée un utilisateur.
    try {
        auth
        .createUserWithEmailAndPassword(
        registerEmail.current.value, 
        registerPassword.current.value).then(async (userAuth) => {
            //ici j'utilise la propriété await user updateProfile pour update une donnée.
            //je lui demande donc de update displayname.
            await userAuth.user.updateProfile({
                displayName,
            })
            console.log(userAuth);
            window.location.reload();
        });
    //ici dans un catch je met un consol log qui permet de voir le message d'erreur dans la console
    } catch (error){
        console.log(error.message);
    }
};

    //ici j'utilise la méthode setdisplayName qui va me permettre de modifier le pseudo.

    return (
        <div>
            <div className='signup-container'>
                <div className='signup'>
                        <h3>S'inscrire</h3>
                    <form onSubmit={(e) => handleRegister(e)}>                 
                        <input type='text' placeholder='Pseudo' required onChange={(e) => setDisplayName(e.target.value)}/>
                        <input type='email' placeholder='Email' required ref={registerEmail} />
                        <input type='password' placeholder='Mot de passe' ref={registerPassword} />
                        <input type='submit' value='Valider inscription' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

