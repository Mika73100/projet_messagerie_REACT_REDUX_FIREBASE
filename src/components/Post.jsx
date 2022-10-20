
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { editPost } from "../actions/post.action";
import CommentPost from "./CommentPost"
import Delete from "./Delete"

//ici je recupère le POST ecrit + l'utilisateur
// ici je crée mes variables
const Post = ({ post, user }) => {
    const [edit, setEdit] = useState(false);
    const [editMess, setEditMess] = useState(null);
    const dispatch = useDispatch();

    const dateFormater = (date) => {
        //ici mon post présente une date de publication afficher en jour
        //1000 secondes - 3600 minutes - 24 jours 
        let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));

        //ici je dit a mon post d'inscrire a coté de la date 'posté aujourd hui'.
        if (days === 0) {
            return "aujourd'hui";
        }   else if (days === 1) {
            return "il y a 1 jour"
        }   else {
            return "il y a " + days + " jours";
        }
    };

    //ici je crée une fonction qui va me permettre d'éditer le message.
    //alors je lui dit : si tu a un message alors tu lance le message, sinon if tu ne fais rien.
    const handleEdit = () => {
        setEdit(false);
    
        //j'utilise updateDoc qui permet de mettre un document a jour avec firebase.
        //et ensuite on vise doc / la bdd qu'il connait deja / puis la catégorie post de notre firebase.
        if (editMess) {
        //dispatchedit : ici j'édite un message
            dispatch(editPost({
                id: post.id,
                message: editMess,
            })
            );
        }
    };

    return (
        <div className='post'>
            <div className='post-header'>
                <div className='left-part'>
                    <div className='title'>
                    <span>{post.author[0]}</span>
                    <h2>{post.author}</h2>
                    </div>
                    <h5>Posté {dateFormater(post.date)}</h5>
                </div>
                {post.authorId === user?.uid && (
                    //ici je demande a authordId si l'auteurs du post et bien celui qui crée le post ? 
                    //c'est pour éviter qu'ont est la possibilité de supprimer le post d'un autre utilisateurs.
                <div className='right-part'>
                    <span onClick={() => setEdit(!edit)}>
                    <i className='fa-solid fa-pen-to-square'></i>
                    </span>
                    <Delete postId={post.id} />
                </div>
                )}
            </div>


            {edit ? (
                //ici le <> s'appel un fragmant enfaite il permet d'entourer d'une balise un élément pour éviter le message d'erreur.
                // il faut toujours un élément supperieur aux autres et donc le fragment sert a ça.
        <>
            <textarea
            autoFocus
            defaultValue={editMess ? editMess : post.message}
            onChange={(e) => setEditMess(e.target.value)}
            ></textarea>
            <button className="edit-btn" onClick={() => handleEdit()}> Modifier message </button>
        </>
        ) : (
        <p>{editMess ? editMess : post.message}</p>
        )} 
        <CommentPost post={post} /> 
    </div>
    );
};

export default Post;