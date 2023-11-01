function RegisterPage () {
    return (
        <section className="page center">
            <div className="card">
                <h1>Registrate</h1>
                <form className="mt-3">
                    <div className="flex">
                        <div className="">
                            <label>
                                Nombre
                            </label>
                            <input className="input" type="text" placeholder="Nombre"></input>   
                        </div>
                        <div>
                            <label >
                                Apellido
                            </label>
                            <input className="input" type="text" placeholder="Apellido"></input>   
                        </div>
                    </div>
                    <div className="mt-2">
                        <label>
                            Usuario
                        </label>
                        <input className="input" type="text" placeholder="Usuario"></input>   
                    </div>
                    <div className="flex mt-2">
                    <div>
                        <label>
                            Contraseña
                        </label>
                        <input className="input" type="password" placeholder="Contraseña"></input> 
                    </div>
                    <div>
                        <label>
                            Confirmar contraseña
                        </label>
                        <input className="input" type="password" placeholder="Confirmar contraseña"></input>     
                    </div>
                    </div>
                    <button className="button button--primary mt-3">Registrarse</button>
                </form>
            </div>
        </section>
    )
}

export default RegisterPage