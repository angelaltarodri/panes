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
                <Route path="/tienda/petipanes" exact >
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
