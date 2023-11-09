import { useState } from "react";
import UsersTable from "./UsersTable";
import Aes from "./AES";
import { userStore } from "../store/user";
import { deleteCookie } from "../utils/cookies";
import { useNavigate } from 'react-router-dom'

function HomePage () {
    const [activeTab, setActiveTab] = useState('tabla');
    const navigate = useNavigate();
    const logoutUserStore = userStore((state) => state.logoutUser);
    const logout = () => {
        deleteCookie('jwt');
        logoutUserStore();
        navigate('/login')
    }
    return (
        <section className="page center">
            <div className="tab">
                <div className="tab__container">
                    <a className={`tab__item ${activeTab === 'tabla' && 'active'}`} onClick={() => setActiveTab('tabla')}>
                        Tabla de usuarios
                    </a>
                    <a className={`tab__item ${activeTab === 'aes' && 'active'}`} onClick={() => setActiveTab('aes')}>
                        Cifrado AES
                    </a>
                </div>
                <div className="tab__content">
                    {
                        activeTab === 'tabla' ? <UsersTable /> : <Aes />
                    }
                </div>
            </div>
            <div className="logout">
                <button className="button button--primary button--primary--outline" onClick={logout}>Cerrar sesión</button>
            </div>
        </section>
    )
}
export default HomePage;