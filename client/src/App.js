import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeNav from './components/HomeNav/HomeNav';
import StoreNav from './components/StoreNav/StoreNav';
import StoreBody from './components/StoreBody/StoreBody';
import StorePetipanes from './components/StorePetipanes/StorePetipanes';
import './App.css';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import ChooseUsername from './components/ChooseUsername/ChooseUsername';
import Signout from './components/Signout/Signout';

function App() {

  const persistConfig = {
    key: 'root',
    storage
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
                <Route path="/" exact >
                  <HomeNav />
                </Route>
                <Route path="/tienda" >
                  <StoreNav />
                  <Route path="/tienda" exact >
                    <StoreBody />
                  </Route>
                  <Route path="/tienda/login" exact >
                    <Login />
                  </Route>
                  <Route path="/tienda/profile" exact >
                    <Profile />
                  </Route>
                  <Route path="/tienda/choose-username" exact >
                    <ChooseUsername />
                  </Route>
                  <Route path="/tienda/signout" exact >
                    <Signout />
                  </Route>
                  <Route path="/tienda/petipanes/:cant" >
                    <StorePetipanes />
                  </Route>
                </Route>
            </Switch>
          </BrowserRouter>  
        </PersistGate>
      </Provider>    
    </div>
  );
}

export default App;
