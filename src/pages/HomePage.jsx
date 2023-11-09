import { useState } from "react";
import UsersTable from "./UsersTable";
import AES from "./AES";
import Aes from "./AES";
function HomePage () {
    const [activeTab, setActiveTab] = useState('tabla')
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
        </section>
    )
}
export default HomePage;