import React, {useEffect, useState} from 'react';
import './css/styles.css'
import Sidebar from './layout/Sidebar';
import UtilBtns from './layout/UtilBtns';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';
import Usuarios from './pages/Usuarios';
import LoginForm from './layout/LoginForm';
import { setCurrentTheme } from './helpers/themes';
import { Provider } from 'react-redux';
import {store} from './store/store'

function App() {
  const [darkMode, setDarkMode] = useState(setCurrentTheme() == 'dark')
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')

/*   useEffect(() => {
    const tentativa = async () => {
     console.log(await addClient(token, 'DASDA', 'TRERGF', '31989877783', '31989877783', 'asdas@gmail.com', 'asfdfa@gmail.com', 'sdgfgfsdgdfsggf', 'dfgdgdgdgdfg', 'sdgfgdfgdf'))
    }
    tentativa()
  }, [token]) */

  return (
    <Provider store={store}>
      <div className="teste">
        {loggedIn &&  <BrowserRouter>
          <Sidebar darkmode={darkMode}/>
          <UtilBtns setDarkMode={setDarkMode} onLogout={() => setLoggedIn(false)}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="clientes" element={<Clientes token={token}/>}/>
            <Route path="produtos" element={<Produtos token={token}/>}/>
            <Route path="vendas" element={<Vendas token={token}/>}/>
            <Route path="usuarios" element={<Usuarios token={token}/>}/>
          </Routes>
        </BrowserRouter>}
        {!loggedIn && <LoginForm onLogin={() => setLoggedIn(true)} setToken={setToken}/>}
      </div>
    </Provider>
  );
}

export default App;
