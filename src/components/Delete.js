import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePost } from '../actions/post.action';


//ici je m'occupe de la suppréssion d'un post.
//je crée une constante que j'appel Delete
//je demande a ce que la méthode apppel l'id du post
//et je continue en créant une nouvelle constante que j'appel dispatch qui sera stocké dans useDispatch
const Delete = ({ postId }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost(postId))
    };
    //ici au clic sur le bouton corbeille l'utilisateur supprime son message.
    return (
        <span className='delete' onClick={e => handleDelete()}>
            <i className='fa-solid fa-trash-can'></i>
        </span>
    );
};

export default Delete;