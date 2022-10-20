import React from 'react'

//ce composant sert aux commentaires
//ici je recuperer les commentaires avec comment
//ensuite dans une constante puis dans une div je retourne le commentaire du l'utilisateur dans le paragraphe text.
const CommentCard = ({ comment }) => {
    return (
        <div className='comment-post'>
            <h5>{comment.commentAuthor}</h5>
            <p>{comment.text}</p>
        </div>
    );
};

export default CommentCard;