import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addPost, getPosts } from '../actions/post.action';

    const CreatePost = ( { uid,displayName }) => {
    const message = useRef();
    const dispatch = useDispatch();
    //ici je crée une const que j appel message et je le met en useRef ce qui sera plus rapide 
    //pour utiliser le const directement dans le text area
    const handlePost = async (e) => {
        e.preventDefault();

        const data = {
            //ici je dit que j'ai besoin de l'auteur du message
            author: displayName,
            authorId: uid,
            message: message.current.value,
            comments: null,
            date: Date.now(),
        };
        await dispatch(addPost(data));
        //ici j'utilise la methode addDoc qui sert a envoyer un élément a la base de donnée firebase.
        //dispatch la fonction
        message.current.value = "";
        dispatch(getPosts());
    };

    
    return (
        <div className='new-post-modal'>
            <form onSubmit={(e) => handlePost(e)}>
                <textarea placeholder='Message...' ref={message}></textarea>
                <input type='submit' value='Envoyer' />
            </form>
        </div>
    );
};

export default CreatePost;





