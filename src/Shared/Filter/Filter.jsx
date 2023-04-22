/* eslint-disable react/prop-types */
import { React }from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import { orderByPrecio, filterByTag, OrderByRecommendation , sortByActivity, orderByQuantity, getMenu } from '../../redux/Actions/actions'
import styles from './Filter.module.css'
import Alert from '../Alert/Alert'

const Filter = (props) => {
  const { render } = props
  const { setOrders } = props
  const dispatch = useDispatch()


const all = () =>{
 dispatch(getMenu())
 console.log(render);
}
//?---------------------------------------------

const orderByPrice = (e)=>{
  const value = e.target.value
  dispatch(orderByPrecio(value))
  setOrders(value)
}
//?---------------------------------------------

const byQuantity = (e) =>{
  const value = e.target.value
  console.log(value);
  dispatch(orderByQuantity(value))
  setOrders(value)
}

//?---------------------------------------------

const OrderByRecomm = async (e)=>{
  const value = e.target.value

  if(value === "recomendadas"){
    const recommendation = await render.filter(menu => menu.recomend_first === true)
    if (!recommendation.length) ReactDOM.render(
      <Alert
        title="Error"
        message={'no hay recomendado'}
        type="danger"
      />,
      document.getElementById('alert')
    )
    else {
      dispatch(OrderByRecommendation(recommendation));
    }
  }
  else {
    const noRecommendation = await render.filter(menu => menu.recomend_first === false)
    if (!noRecommendation.length) ReactDOM.render(
      <Alert
        title="Error"
        message={'no hay No recomendado'}
        type="danger"
      />,
      document.getElementById('alert')
    )
    else {
      dispatch(OrderByRecommendation(noRecommendation));
    }
  }
}

//?---------------------------------------------

  const handleChangeFilter = async (e) => {
    const value = e.target.value
    const myTag = render.filter(menu => menu.Tags.includes(value))
// console.log(myTag);
    dispatch(filterByTag(myTag))
  }

//?---------------------------------------------

const orderActivity = (e) =>{
  const value = e.target.value

  if(value === "activo"){
    const activity = render.filter(state => state.is_active === true)
    if(!activity.length) ReactDOM.render(
      <Alert
        title="Error"
        message={'no hay menú activo'}
        type="danger"
      />,
      document.getElementById('alert')
    )
    else{
      dispatch(sortByActivity(activity))
    }
  }else{
    const inactivity = render.filter(state => state.is_active === false)
    if(!inactivity.length) ReactDOM.render(
      <Alert
        title="Error"
        message={'no hay menú inactivo'}
        type="danger"
      />,
      document.getElementById('alert')
    )
    else{
      dispatch(sortByActivity(inactivity))
    }
  }
}

//?---------------------------------------------

  return (
    <div className={styles.container}>
      <button onClick={all} className={styles.colButton}>Actualizar</button>
      <div className={styles.col}>
        <label htmlFor="">Ordenar por precio</label>
        <select name="" id="" className={styles.select} onChange={(e)=>{orderByPrice(e)}}>
          <option value="menor">Menor Precio</option>
          <option value="mayor">Mayor Precio</option>
        </select>
      </div>

      <div className={styles.col}>
        <label htmlFor="">Ordenar por Cantidad</label>
        <select name="" id="" className={styles.select} onChange={(e)=>{byQuantity(e)}}>
          <option value="menor">Menor Cantidad</option>
          <option value="mayor">Mayor Cantidad</option>
        </select>
      </div>

      <div className={styles.col}>
        <label htmlFor="">Filtrar por actividad</label>
        <select name="" id="" className={styles.select} onChange={(e)=>{orderActivity(e)}}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className={styles.col}>
        <label htmlFor="">Filtrar Recomendados</label>
        <select name="" id="" className={styles.select} onChange={(e)=>{OrderByRecomm(e)}}>
          <option value="none">opciones</option>
          {/* <option value="todos">todos</option> */}
          <option value="recomendadas">+ Recomendado</option>
          <option value="noRecomendadas">- Recomendado</option>
        </select>
      </div>

      <div className={styles.col1}>
        <label htmlFor="">Filtrar categorias</label>
        <select
          name=""
          id=""
          className={styles.select}
          onChange={(e)=> handleChangeFilter(e)}
          >
          <option value="none">opciones</option>
          <option value="Vegetariano">vegetariano</option>
          <option value="Familiar">familiar</option>
          <option value="Pizza">pizza</option>
          <option value="Para Compartir">Para Compartir</option>

        </select>
      </div>
    </div>
  )
}

export default Filter
