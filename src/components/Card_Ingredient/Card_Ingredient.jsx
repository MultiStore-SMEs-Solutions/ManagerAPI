/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Card_Ingredients.module.css'
import { useDispatch } from 'react-redux';
import { deleteIngredient } from '../../redux/Actions/actions';

const CardIngredient = ({ name, medida, id }) => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteIngredient(id))
    }
  return (
      <div className={styles.ingredient}>
          <div className={styles.name}>
              <span>{name}</span>
          </div>
          <div className={styles.medida}>
              <span>{medida}</span>
          </div>
          <div className={styles.image}>
              <img src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png" alt="" onClick={handleDelete}/>
          </div>
      </div>
  );
}

export default CardIngredient
