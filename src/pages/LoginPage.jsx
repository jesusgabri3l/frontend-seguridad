import { Link, useNavigate } from "react-router-dom";
import sha1 from 'sha1';
import { useState } from "react";
import Spinner from '../components/Spinner';
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { userStore } from "../store/user";
import { setCookie } from '../utils/cookies.js'

function LoginPage () {
    const navigate = useNavigate();
    const setUserStore = userStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        error: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'username') setFormData({ ...formData, username: e.target.value, error: '' });
        if (e.target.name === 'password') setFormData({ ...formData, password: e.target.value, error: '' });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.trim() === '' || formData.password.trim() === '') {
            setFormData({...formData, error: 'Por favor completa los campos'});
        }
        try {
            const passwordEncrypted = sha1(formData.password.trim());
            setLoading(true);
            const { data: response } = await api.loginService({
                username: formData.username.trim(),
                password: passwordEncrypted
            });
            setLoading(false);
            if (response.error) setFormData({...formData, error: response.error});
            else {
                const userData = jwtDecode(response.token);
                setCookie('jwt', response.token, 1);
                setUserStore({
                    ...userData,
                  });
                navigate('/');
            }
        } catch (e) { 
            console.log(e)
        } 
    }

    return (
        <section className="page center">
            <form className="card" onSubmit={(e) => handleSubmit(e)}>
                    <h1>Iniciar sesion</h1>
                    <input className="input mt-4" 
                        type="text" 
                        placeholder="Usuario" 
                        name="username" 
                        required
                        onChange={(e) => handleChange(e)} />
                    <input 
                        className="input mt-1" 
                        type="password" 
                        placeholder="Contraseña" 
                        name="password"
                        required
                        onChange={(e) => handleChange(e)} />   
                    <button className="button button--primary mt-2" type="submit">Iniciar sesión</button>
                    {
                        formData.error &&  <p className="error mt-1">{formData.error}</p>
                    }
                    {
                        loading && <Spinner className="mt-1"/>
                    }
                    <p className=" text-muted mt-3" >
                        No tienes una cuenta para entrar? <Link to={`/register`}> Registrate</Link>
                    </p>
            </form>
        </section>
    )
}

export default LoginPage;