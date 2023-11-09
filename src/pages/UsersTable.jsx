import { useEffect, useState } from "react";
import api from '../services/api';
import Spinner from '../components/Spinner';
import html2pdf from "html2pdf.js";

function UsersTable() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const convertToPdf = () => {
        const element = document.querySelector(".table");
        const options = {
          margin: 10,
          filename: "users.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(element).set(options).save();
      };
    useEffect( () => {
        const getUsers = async () => {
            try {
                const {data} = await api.gettAllUsers();
                if(data.error) {
                    setError(data.error);
                    return
                }
                setUsers(data.users)
            } catch (error) { 
                setError('Hubo un error')
            } finally {
                setLoading(false)
            }
        }
        getUsers();
    }, [])
    return loading ? <Spinner /> : 
        <div>
            <table className="table" cellSpacing={0}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nombre de usuario</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            {
                error && <p className="error">{error}</p>
            }
            <button className="button button--primary button--primary--outline mt-2" onClick={() => convertToPdf()} style={{ width: '30%' }} type="submit">Descargar</button>
        </div>
}

export default UsersTable;