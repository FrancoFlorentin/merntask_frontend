import Alerta from "../components/Alerta"
import PreviewProyecto from "../components/PreviewProyecto"
import useProyectos from "../hooks/useProyectos"


export default function Proyectos() {

  const { proyectos, alerta } = useProyectos()
  
  const { msg } = alerta

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow-lg mt-10 rounded-lg">
        {proyectos.length 
          ? proyectos.map(proyecto => (
            <PreviewProyecto proyecto={proyecto} key={proyecto._id}/>
          )) 
          : <p className="text-center text-gray-600 uppercase p-5">No hay proyectos</p>
        }
      </div>
    </>
  )
}
