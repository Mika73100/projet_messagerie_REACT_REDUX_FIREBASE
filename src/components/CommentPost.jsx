import { onAuthStateChanged } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../actions/post.action";
import { auth } from "../utils/firebase.config";
import CommentCard from "./CommentCard";

const CommentPost = ({ post }) => {
    const [user, setUser] = useState(null);
    const answerContent = useRef();
    const dispatch = useDispatch();

    //ici j'utilise la méthode onAuthstatechanged qui permet de voir si le statut de user a changer.
    //par exemple deco ou connecter, je rappel auth qui fait référence a mon fichier firebase.
    //cette méthode permet de dire si nous sommes bien connecter.
    onAuthStateChanged(auth, (currentUser) => {
    //ici notre code dit a firebase: attention un utilisateur est maintenant connecter.
    setUser(currentUser);
    });


    const handleComment = (e) => {
        e.preventDefault();

        //ici je met a jour un post.
        let data = [];

        //ici je dit : si mon commentaire est nul alors j'aimerais que data lui passe un commentaire.
        if (post.comments === null) {
        data = [
            {
                commentAuthor: user.displayName,
                text: answerContent.current.value,
            },
        ];
        //Mais si mon commentaire n'est pas null et que celui-ci dispose déjà d'un commentaire alors il faudra en rajouter 1 par la suite.
    } else {
        data = [
            ...post.comments,
            {
                commentAuthor: user.displayName,
                text: answerContent.current.value,
            },
        ];
    }


        //ici je vais chercher l'update dans la base de donnnée.
        dispatch(addComment(post.id, data));
        //ici je vide le formulaire après l'envoie.
    answerContent.current.value = "";
    };
    
    
    return (
        <div className='comment-container'>
            <h5 className='comment-title'>Commentaires</h5>
            {post.comments && 
            post.comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}

            {user ? (
                <form onSubmit={(e) => handleComment(e)}> 
                    <textarea placeholder="Envoyer un commentaire" ref={answerContent}></textarea>
                    <input type="submit" value="Envoyer" />
                </form>
            ) : (
                <p>Vous devez être connecté pour poster un commentaire</p>
            )}
        </div>
    );
};

export default CommentPost;