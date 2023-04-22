/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styles from './Pagination.module.css'
import { Pagination } from '@mui/material'

const PaginationComponent = ({ pagina, setPagina, maximo }) => {
  useEffect(() => {
    if (parseInt(pagina) > maximo) {
      setPagina(maximo)
    } else if (parseInt(pagina) < 1 && maximo > 0) {
      setPagina(1)
    }
  }, [maximo, pagina, setPagina])

  return (
    <div className={styles.pag}>
      <div className={styles.container}>
        <Pagination
          count={maximo}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={(e, index) => {
            setPagina(index)
          }}
        />
      </div>
    </div>
  )
}

export default PaginationComponent
