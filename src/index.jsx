
// j'importe mes composants
import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.scss"
import App from "./App"

// Redux
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import rootReducer from "./reducers"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//j'appel mes composants aurtour de app ( élément parent)
//ici le provider va prendre en compte le store qui lui va recuperer comme un magasin toute mes données.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

