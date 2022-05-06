import React from "react"
import { nanoid } from "nanoid"

function App() {
  //hooks
  const [nombre,setNombre]=React.useState('')
  const [apellido,setApellido]=React.useState('')
  const [id,setId]=React.useState('')
  const [lista,setLista]=React.useState([])
  const [modoEdicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)
  const guardarDatos=(e)=>{
    e.preventDefault()
    //validaciones
    if(!nombre.trim()){
      setError('Ingrese el nombre')
      return
    }
    if(!apellido.trim()){
      setError('Ingrese el apellido')
      return
    }
    //prueba en consola
    console.log(nombre+' '+apellido);
    //agregar a la lista
    //npm i nanoid instalar nanoid
    setLista([
      ...lista,
      {id:nanoid(3),nombre,apellido}
    ])
    //limpiar estados
    setNombre('')
    setApellido('')
    //quitar mensaje de error
    setError(null)
  }
  //función eliminar dato
  const eliminarDato=(id)=>{
    const listaFiltrada=lista.filter((elemento)=>elemento.id!==id)
    setLista(listaFiltrada)
  }
  //funcion editar elemento
  const editar=(elemento)=>{
    setModoEdicion(true)//cambiar modo edicion a verdadero
    //se actualiza estados para que los datos aparezcan en input
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setId(elemento.id)
  }
  const editarDatos=(e)=>{
    e.preventDefault()
    //validaciones
    if(!nombre.trim()){
      setError('Ingrese el nombre')
      return
    }
    if(!apellido.trim()){
      setError('Ingrese el apellido')
      return
    }
    const listaEditada=lista.map(
      //recorre toda la lista, cuando encuentre el id agrega id, nuevonombre y nuevapellido, 
      //sino devuelve cada elemento
      //nueva lista
      (elemento)=>elemento.id===id ? {id:id,nombre:nombre,apellido:apellido}:
      elemento)
    //listar con los valores nuevos...lista nueva
    setLista(listaEditada)
    //cambiar modo a dejar de editar y limpiar estados
    setModoEdicion(false)
    setNombre('')
    setApellido('')
    setId('')
    //quitar msj de error
    setError(null)
  }
  return (
    <div className="container">
       <h2 className="text-center">{
         modoEdicion ? 'Editar Usuario': 'Registro de Usuarios'
       }</h2>
      {/*primera fila para el formulario*/}
      <div className="row">
        <div className="col-12">
          <form onSubmit={ modoEdicion ? editarDatos : guardarDatos}>
            {/*mensaje error */}
            {
              error ? (
                <div className="alert alert-danger" role="alert">
              {error}
            </div>
              ):
              null
            }
            {/*input nombre */}
            <input type="text" 
            placeholder="Ingrese el Nombre"
            className="form-control mb-3"
            onChange={(e)=>{setNombre(e.target.value)}}
            value={nombre}
            />
            {/*input nombre */}
            <input type="text" 
            placeholder="Ingrese el Apellido"
            className="form-control mb-3"
            onChange={(e)=>{setApellido(e.target.value)}}
            value={apellido}
            />
            {/*boton agregar*/}
            <div className="d-grid gap-2">
              {
                modoEdicion ? <button className="btn btn-outline-warning mb-3" type="submit">Editar</button>
                : <button className="btn btn-outline-info mb-3" type="submit">Agregar</button>
              }
            </div>
          </form>
        </div>
      </div>
      {/*fila para la lista */}
      <div className="row">
        <div className="col-12">
        <h4 className="text-center">Lista de Usuarios</h4>
          <ul className="list-group">
          {
            lista.length===0 ? <li className="list-group-item">No existen Usuarios</li>:
            (
              lista.map((elemento)=>(
                <li className="list-group-item" key={elemento.id}><span className="lead">
                  {elemento.nombre} {elemento.apellido}
                  </span>
                  <button className="btn btn-success btn-sm mx-2 float-end"
                  onClick={()=>editar(elemento)}
                  >Editar</button>
                  <button className="btn btn-danger btn-sm mx-2 float-end"
                  onClick={()=>eliminarDato(elemento.id)}
                  >Eliminar</button>
                </li>
              ))
            )
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
