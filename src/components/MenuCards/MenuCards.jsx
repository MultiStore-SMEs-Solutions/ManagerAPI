/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import CardMenu from '../Card_menu/Card_menu'
import styles from './MenuCards.module.css'
import Pagination from '../../Shared/Pagination/PaginationComponent'

const MenuCards = (props) => {
  // TODO Este será el estado global que contiene todos los menus
  const { render } = props

  const [pagina, setPagina] = useState(1)
  const [porPagina] = useState(10)

  const maximo = Math.ceil(render.length / porPagina)
  // * Debe recibir por props el numer de la página en que se encuentra y la cantidad de cards que mostrará en cada página;

  return (
    <div className={styles.containerBig}>
      <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
      <div className={styles.cards}>
        <div className={styles.description}>
          <span className={styles.foto}>Foto</span>
          <span className={styles.nombre}>Nombre</span>
          <span className={styles.id}>Active</span>
          <span className={styles.precio}>Precio</span>
          <span className={styles.cantidad}>Cantidad</span>
          <span className={styles.accion}>Acción</span>
        </div>
        <div className={styles.container}>
          {render
            ?.slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((element, index) => (
              <CardMenu
                id={element.id}
                name={element.name}
                cuantity={element.stock}
                key={index}
                imgURL={element.url_image}
                price={element.price?.toFixed(2)}
                active={element.is_active}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MenuCards
