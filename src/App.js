import React, { useEffect, useState } from 'react'
import ConnectModal from './components/ConnectModal'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './utils/firebase.config'
import CreatePost from './components/CreatePost'
import Post from './components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './actions/post.action'

function App() {
  //ici je met le useState a null car je ne sais pas si l utilisateur est connecté.
  const [user, setUser] = useState(null);
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  //ici j'utilise la méthode onAuthstatechanged qui permet de voir si le statut de user a changer.
  //par exemple deco ou connecter, je rappel auth qui fait référence a mon fichier firebase.
  //cette méthode permet de dire si nous sommes bien connecter.
  onAuthStateChanged(auth, (currentUser) => {
    //ici notre code dit a firebase: attention un utilisateur est maintenant connecter.
    setUser(currentUser);
  });

  useEffect(() => {
        dispatch(getPosts());
  }, []);

  //ici je parametre la deconnexion avec la firebase.
  //exemple: comme dans un crud il s'agit de la partie supprimer.
  const handleLogout = async () => {
    await signOut(auth);
  }


  return (
    <div>
    <h2 style={centerH2}>Bienvenue page d'accueil !</h2><br/>
        
        <div className='app-header'>
        {user && (
          <div className='user-info'>
          <span>{user?.displayName[0]}</span>
          <h4>{user?.displayName}</h4>
          <button onClick={() => handleLogout()}>
            <i className='fa-solid fa-arrow-right-from-bracket'></i>
          </button>
          </div>
        )}

          
        {user ? (
          <CreatePost uid={user.uid} displayName={user.displayName} />
        ) : (
          <ConnectModal />
        )}
        </div>

        <div className='posts-container'>
            {posts.length > 0 && 
            posts
            .sort((a, b) => b.date - a.date)
            .map((post) => <Post post={post} key={post.id} user={user}/>)}
        </div>
    </div>
  );
}

//ici je fais mon css en javascript
const centerH2 = {
  textAlign: 'center',
  marginTop: '50px'
}

export default App;
