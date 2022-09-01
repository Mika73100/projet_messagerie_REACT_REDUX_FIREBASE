import { doc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { editPost } from "../actions/post.action";
import CommentPost from "./CommentPost"
import Delete from "./Delete"

const Post = ({ post, user }) => {
    const [edit, setEdit] = useState(false);
    const [editMess, setEditMess] = useState(null);
    const dispatch = useDispatch();

    const dateFormater = (date) => {
        //ici mon post présente une date de publication afficher en jour
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