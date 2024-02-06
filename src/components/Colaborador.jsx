import useProyectos from "../hooks/useProyectos"

export default function Colaborador({colaborador}) {

    const { nombre, email } = colaborador
    const { handleModalEliminarColaborador } = useProyectos()

    return (
        <div className="border-b p-5 flex justify-between items-center">
             <div>
                <p className="text-sm text-gray-700 font-bold">{nombre}</p>
                <p>{email}</p>
             </div>

             <div>
                <button
                    type="button"
                    className="bg-red-600 px-4 py-3 uppercase font-bold text-white text-sm rounded-lg"
                        onClick={() => handleModalEliminarColaborador(colaborador)}
                >Eliminar</button>
             </div>
        </div>
    )
}
