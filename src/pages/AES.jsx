
import { useState } from "react";
import CryptoJS from 'crypto-js';

function Aes() {
    const [selectedFileEncr, setSelectedFileEncr] = useState(null);
    const [keyEncr, setKeyEncr] = useState('');
    const [errorEncr, setErrorEncr] = useState(null);
    const [option, setOption] = useState('encrypt');

    const handleFileChangeEncr = (e) => {
        setSelectedFileEncr(e.target.files[0]);
    };
    const handleSubmitEncr = (e) => {
        e.preventDefault();
        if (!selectedFileEncr || !keyEncr) {
            setErrorEncr('No hay archivo o una llave, por favor complete.');
            return false;
        }
        const fileName = selectedFileEncr.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        setErrorEncr(null);
        if (option === 'encrypt') {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result.split('base64,')[1];
                const encrypted = CryptoJS.AES.encrypt(fileContent, keyEncr);
                const encryptedBlob = new Blob([encrypted.toString()], { type: 'application/octet-stream' });
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(encryptedBlob);
                downloadLink.download = 'archivo-aes.dat';
                downloadLink.click();
                setKeyEncr('');
                document.getElementById("file-input").value = "";
                setErrorEncr(null);
            };

            reader.readAsDataURL(selectedFileEncr);
        } else {
            if (fileExtension !== 'dat') {
                setErrorEncr('Por favor ingrese un archivo .dat')
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result;
                try {
                    const decrypted = CryptoJS.AES.decrypt(fileContent, keyEncr).toString(CryptoJS.enc.Utf8);

                    const binaryContent = atob(decrypted);
                    if (binaryContent.length === 0) {
                        setErrorEncr('Error al desencriptar el archivo. Asegúrate de que la clave sea correcta.');
                        return;
                    }
                    const arrayBuffer = new ArrayBuffer(binaryContent.length);
                    const uint8Array = new Uint8Array(arrayBuffer);

                    for (let i = 0; i < binaryContent.length; i++) {
                        uint8Array[i] = binaryContent.charCodeAt(i);
                    }
                    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = 'archivo-desencriptado.txt';
                    downloadLink.click();
                    setKeyEncr('');
                    document.getElementById("file-input").value = "";
                    setErrorEncr(null);
                } catch (error) {
                    setErrorEncr('Error al desencriptar el archivo. Asegúrate de que la clave sea correcta.');
                }
            };
            reader.readAsText(selectedFileEncr);
        }

    }
    return <div className="aes">
        <div>
            <h2>
                {
                    option === 'encrypt' ? 'Encriptar' : 'Desencriptar'
                }
            </h2>
            <form className="mt-2" onSubmit={handleSubmitEncr}>
                <input id="file-input" type="file" onChange={handleFileChangeEncr} accept={`${option === 'encrypt' ? '.txt' : '.dat'}`} />
                <input className="input mt-1" placeholder="Llave" value={keyEncr} name="key" onChange={(e) => setKeyEncr(e.target.value)}></input>
                <select className="input mt-1" onChange={(e) => setOption(e.target.value)}>
                    <option value="encrypt">Encriptar</option>
                    <option value="desencrypt">Desencriptar</option>
                </select>
                <button className="mt-3 button button--primary button--primary--outline">
                    { option === 'encrypt' ? 'Encriptar' : 'Desencriptar' }</button>
            </form>
            {
                errorEncr && <p className="error mt-2">{errorEncr}</p>
            }

        </div>
    </div>;
}

export default Aes;