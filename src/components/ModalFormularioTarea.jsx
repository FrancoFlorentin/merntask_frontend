import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const PRIORIDAD = ["Baja", "Media", "Alta"]

export default function ModalFormularioTarea() {

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('')

    const params = useParams()

    const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyectos()

    useEffect(() => {
        if (tarea?._id) {
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
            setPrioridad(tarea.prioridad)
            return
        }

        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')

    }, [tarea])

    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        await submitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id})
     
        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
    }

    const { msg } = alerta


  return (
    <>
        <Transition appear show={modalFormularioTarea} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleModalTarea}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div className="sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalTarea  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            
                            <Dialog.Title
                                as="h3"
                                className="text-4xl font-bold leading-6 text-gray-900"
                            >
                                {id ? "Editar Tarea" : "Crear Tarea"}
                            </Dialog.Title>
                            
                            {msg && (<Alerta alerta={alerta} />)}

                            <form 
                                onSubmit={handleSubmit}
                                className='mt-9 mb-5'
                            >
                                <div className='mb-5'>
                                    <label
                                        className='text-gray-700 uppercase font-bold text-sm'
                                        htmlFor='nombre'
                                    >Nombre Tarea</label>
                                    <input 
                                        id='nombre'
                                        type="text" 
                                        placeholder='Nombre de la tarea'
                                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
                                    />
                                </div>

                                <div className='mb-5'>
                                    <label
                                        className='text-gray-700 uppercase font-bold text-sm'
                                        htmlFor='descripcion'
                                    >Descripcion Tarea</label>
                                    <textarea 
                                        id='descripcion' 
                                        placeholder='Descripcion de la tarea'
                                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                        value={descripcion}
                                        onChange={e => setDescripcion(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className='mb-5'>
                                    <label
                                        className='text-gray-700 uppercase font-bold text-sm'
                                        htmlFor='fecha-entrega'
                                    >Fecha de Entrega</label>
                                    <input
                                        type='date'
                                        id='fecha-entrega' 
                                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                        value={fechaEntrega}
                                        onChange={e => setFechaEntrega(e.target.value)}
                                    />
                                </div>

                                <div className='mb-6'>
                                    <label
                                        className='text-gray-700 uppercase font-bold text-sm'
                                        htmlFor='prioridad'
                                    >Prioridad</label>
                                    <select 
                                        id='prioridad'
                                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                        value={prioridad}
                                        onChange={e => setPrioridad(e.target.value)}
                                    >
                                        <option value="">-- Seleccionar --</option>
                                        {PRIORIDAD.map(opcion => (
                                            <option key={opcion}>{opcion}</option>
                                        ))}
                                    </select>
                                </div>

                                <input 
                                    type="submit" 
                                    value={id ? "Guardar Cambios" : "Crear Tarea"}
                                    className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded' 
                                />
                            </form>

                        
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}
