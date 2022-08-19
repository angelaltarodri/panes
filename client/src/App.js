import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
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
import Cart from './components/Cart/Cart';

function App() {

  const persistConfig = {
    key: 'root',
    storage
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  const Store = () => {
    return <div>
      <StoreNav/>
      <Outlet/>
    </div>
  }

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routes>
                <Route path="" element={<HomeNav/>}></Route>
                <Route path="tienda" element={<Store/>}>
                  <Route path="" element={<StoreBody/>}/>
                  <Route path="login" element={<Login/>}/>
                  <Route path="carrito" element={<Cart />}/>
                  <Route path="profile" element={<Profile/>}/>
                  <Route path="choose-username" element={<ChooseUsername/>}/>
                  <Route path="signout" element={<Signout/>}/>
                  <Route path="petipanes/:cant" element={<StorePetipanes/>}/>
                </Route>
            </Routes>
          </BrowserRouter>  
        </PersistGate>
      </Provider>    
    </div>
  );
}

export default App;
