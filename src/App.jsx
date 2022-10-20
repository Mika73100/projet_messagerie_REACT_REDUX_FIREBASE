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
  //ici je crée une constante post qui va utiliser la fonction useselector 
  //qui va charger dans le state et incrémenter le postreducer pour me montrer toute la bdd
  const posts = useSelector((state) => state.postReducer);
  //ici j appel dispatch qui va me permettre d executé l'action
  //alors je lui dit usedispatch -> dispatch moi les données dans le store.
  const dispatch = useDispatch();

  //ici j'utilise la méthode onAuthstatechanged qui permet de voir si le statut de user a changer.
  //par exemple deco ou connecter, je rappel auth qui fait référence a mon fichier firebase.
  //cette méthode permet de dire si nous sommes bien connecter.
  onAuthStateChanged(auth, (currentUser) => {
    //ici notre code dit a firebase: attention un utilisateur est maintenant connecter.
    //Et donc pour resultat nous pouvons appeler cette méthode dans n'importe quel composant de notre application.
    setUser(currentUser);
  });

  useEffect(() => {
        dispatch(getPosts());
  }, []);

  //ici je parametre la deconnexion avec la firebase.
  //c'est souvent handle quelque chose qui simbolise une action ...
  //handleLogout et donc deconnecte toi c'est une fonction asyncrone 
  //qui utilise await ( il attend quelque chose ) => signout(auth)
  const handleLogout = async () => {
    await signOut(auth);
  }


  return (
    <div>
    <h2 style={centerH2}>Bienvenue page d'accueil !</h2><br/>
        
        <div className='app-header'>
        {user && (
          <div className='user-info'>
          <span>{
            //ici je demande si user existe '?' alors s'il existe alors affiche le graçe a displayName.
            user?.displayName[0]}</span>
          <h4>{user?.displayName}</h4>
          <button onClick={() => handleLogout()}>
            <i className='fa-solid fa-arrow-right-from-bracket'></i>
          </button>
          </div>
        )}


        { //ici je demande si user existe avec un '?' si oui alors donne la posiilité de crée un message (POST) sinon on donne la possibilité de connexion avec connectModal
          user ? (
          <CreatePost uid={user.uid} displayName={user.displayName} />
        ) : (
          <ConnectModal />
        )}
        </div>

        <div className='posts-container'>
            {posts.length > 0 && 
            posts
            //ici j'utilise la fonction sort qui me permet d'afficher dans l'ordre croissant mes message il prend en compte la date du post.
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
