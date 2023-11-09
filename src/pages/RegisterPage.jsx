import { useState } from "react"
import sha1 from 'sha1';
import api from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { userStore } from "../store/user";
import { setCookie } from '../utils/cookies.js'
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function RegisterPage () {
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }
    const setUserStore = userStore((state) => state.setUser);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        lastName: '',
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [formFeedback, setFormFeedback] = useState({
        loading: false,
        error: null
    });

    const handleChange = (e) => {
        setFormFeedback({...formFeedback, error: null})
        const formDataHelper = {...formData};
        formDataHelper[e.target.name] = e.target.value;
        setFormData(formDataHelper);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const isFormDataValid = Object.keys(formData).every(key => formData[key].trim() !== '');
        if (!isFormDataValid) {
            setFormFeedback({...formFeedback, error : 'Por favor complete todos los campos'});
            return ;
        }
        if (!validatePassword(formData.password)) {
            setFormFeedback({...formFeedback, error : 'La contraseña debe contener: mínimo 8 caracteres con al menos 1 número, 1 minúscula, 1 mayúscula y 1 especial'});
            return; 
        }
        if (formData.password !== formData.confirmPassword) {
            setFormFeedback({...formFeedback, error : 'Las contraseñas no coinciden'});
            return;
        }
        try {
            const passwordEncrypted = sha1(formData.password.trim());
            setFormFeedback({ ...formFeedback, loading: true });
            const { data: response } = await api.registerService({
                name: formData.name,
                username: formData.username,
                lastName: formData.lastName,
                password: passwordEncrypted
            });
            setFormFeedback({ ...formFeedback, loading: true });
            if (response.error) setFormFeedback({...formFeedback, error: response.error});
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
            <div className="card">
                <h1>Registrate</h1>
                <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
                    <div className="flex">
                        <div className="">
                            <label>
                                Nombre
                            </label>
                            <input required value={formData.name} onChange={(e) => handleChange(e)} name="name" className="input" type="text" placeholder="Nombre"></input>   
                        </div>
                        <div>
                            <label >
                                Apellido
                            </label>
                            <input required value={formData.lastName} onChange={(e) => handleChange(e)} name="lastName" className="input" type="text" placeholder="Apellido"></input>   
                        </div>
                    </div>
                    <div className="mt-2">
                        <label>
                            Usuario
                        </label>
                        <input required value={formData.username} onChange={(e) => handleChange(e)} name="username" className="input" type="text" placeholder="Usuario"></input>   
                    </div>
                    <div className="flex mt-2">
                    <div>
                        <label>
                            Contraseña
                        </label>
                        <input required value={formData.password} onChange={(e) => handleChange(e)} name="password" className="input" type="password" placeholder="Contraseña"></input> 
                    </div>
                    <div>
                        <label>
                            Confirmar contraseña
                        </label>
                        <input required value={formData.confirmPassword} onChange={(e) => handleChange(e)} name="confirmPassword" className="input" type="password" placeholder="Confirmar contraseña"></input>     
                    </div>
                    </div>
                    <button className="button button--primary mt-3" type="submit">Registrarse</button>
                </form>
                {
                    formFeedback.error && <p className="error mt-1">{formFeedback.error}</p>
                }
                {
                    formFeedback.loading && <Spinner />
                }
            </div>
        </section>
    )
}

export default RegisterPage