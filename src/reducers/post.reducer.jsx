import { ADD_COMMENT, ADD_POST, DELETE_POST, EDIT_POST, GET_POSTS } from "../actions/post.action";

const initialState = {}

// j'export par defaut mon postReducer
export default function postReducer(state = initialState, action) {
    switch (action.type) {
        //ici je dit : quand tu reçois une action de type POST il faudra me retourner les données.
        case GET_POSTS:
            return action.payload;
            //ici je casse le tableau en cour et grace a ...state je rajoute de nouvelle donnée a mon tableau existant.
        case ADD_POST:
            return [action.payload, ...state];
        case EDIT_POST:
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        message: action.payload.message,
                    };
                } else return post;
            });
            //ici je supprime un post avec delete post tous les post qui ne sont pas égale a l'action du payload.
            case DELETE_POST:
                return state.filter((post) =>  post.id !== action.payload.postId);
            case ADD_COMMENT:
                return state.map((post) => {
                    if (post.id === action.payload.postId) {
                        return {
                            ...post,
                            comments: action.payload.data,
                        }
                    } else return post
                });
        default:
        return state;
    }
}
