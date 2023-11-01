
function LoginPage () {
    return (
        <section className="page center">
            <div className="card">
                <h1>Iniciar sesion</h1>
                <input className="input mt-4" type="text" placeholder="Usuario"></input>
                <input className="input mt-1" type="password" placeholder="Contraseña"></input>
                <button className="button button--primary mt-2">Iniciar sesión</button>
                <p className=" text-muted mt-3" >
                    No tienes una cuenta para entrar? <a className=""> Registrate</a>
                </p>
            </div>
        </section>
    )
}

export default LoginPage;