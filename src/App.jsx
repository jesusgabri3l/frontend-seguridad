import './styles/index.scss';
import { userStore } from './store/user';
import { getCookie } from './utils/cookies';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';

import ProtectedRoute from './components/ProtectedRoute';
import UnProtectedRoute from './components/UnProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Spinner from './components/Spinner';

import {
  BrowserRouter, Routes, Route
} from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);
  const setUserStore = userStore((state) => state.setUser);
  useEffect(() => {
    const cookie = getCookie('jwt');
    if(cookie) {
      const userData = jwtDecode(cookie);
      setUserStore({
        ...userData,
      });
    }
    setLoading(false);
  }, [])
  return <div className='wrapper'>
    {loading ? 
    <Spinner /> 
    : 
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<UnProtectedRoute><LoginPage /></UnProtectedRoute>} />
        <Route path='register' element={<UnProtectedRoute><RegisterPage /></UnProtectedRoute>} />
        <Route path='/' exact element={
          <ProtectedRoute> 
            <HomePage /> 
          </ProtectedRoute>
        } 
        />
      </Routes>
    </BrowserRouter>
    }
    </div>
}

export default App
