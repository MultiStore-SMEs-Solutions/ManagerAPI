/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Title.module.css'

const Title = (props) => {
  return (
    <div className={styles.title}>
      <h1>{props.data}</h1>
    </div>
  )
}

export default Title
