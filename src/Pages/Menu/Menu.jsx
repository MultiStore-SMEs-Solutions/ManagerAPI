/* eslint-disable no-unused-vars */
import React, { useEffect, useState} from 'react'
import MenuCards from '../../components/MenuCards/MenuCards'
import NavBar from '../../Shared/NavBar/NavBar'
import Filter from '../../Shared/Filter/Filter'

import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../redux/Actions/actions'

import { NavLink } from 'react-router-dom'
import style from './menu.module.css'
import LateralBar from '../../components/LateralBar/LateralBar'
const Menu = () => {
  const dispatch = useDispatch()
  const render = useSelector((state) => state.render)
  const [orders , setOrders] = useState("")


  // Dispatch

  useEffect(() => {
  
      dispatch(getMenu())
  
  }, [])

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <Filter render={render} setOrders={setOrders} />
      </div>
        <MenuCards render={render} />
    </div>
  )
}

export default Menu
