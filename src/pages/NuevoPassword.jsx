import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/ClienteAxios"


export default function NuevoPassword() {

    const [password, setPassword] = useState('')
    const [mostrarForm, setMostrarForm] = useState(false)
    const [alerta, setAlerta] = useState({})

    const params = useParams();
    const { token } = params


    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setMostrarForm(true)
                
            } catch (error) {
                setMostrarForm(false)
                setAlerta({
                    msg: error.response.data.msg,
                    error: true                    
                })
            }
        }
        comprobarToken();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: "El password debe tener al menos 6 caracteres",
                error: true
            })
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;

            const { data } = await axios.post(url, {password})
            setMostrarForm(false)
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta
    const { error } = alerta

  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl capitalize text-center'>
            Reestablece tu password y no pierdas acceso a tus <span className='text-slate-700'>proyectos</span>
        </h1> 

        {msg && (<Alerta alerta={alerta} />)}

        {mostrarForm && (
            <form 
                onSubmit={handleSubmit}
                className='my-10 bg-white shadow rounded-lg p-10'
            >
                <div className='my-5'>
                    <label 
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='password'
                    >Nuevo Password</label>
                    <input 
                        type="password" 
                        name="password"
                        id='password' 
                        placeholder='Ingresa tu nuevo password'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        autoComplete="off"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Guardar Nuevo Password"
                    className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
                />
            </form>
        )}

        {!mostrarForm && !error && (
            <Link
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/"
            >Inicia Sesión</Link>
        )}
    </>
  )
}
