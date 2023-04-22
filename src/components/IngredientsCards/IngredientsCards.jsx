import React from 'react'
import CardIngredient from '../Card_Ingredient/Card_Ingredient'
import { useSelector } from 'react-redux'
import styles from './IngredientsCards.module.css'

const IngredientsCards = () => {
  const ingredients = useSelector((state) => state.ingredients)
  return (
        <div className={styles.cards}>
            <div className={styles.description}>
                <div>
                    {/* <span className={styles.id}>Id</span> */}
                    <span className={styles.name}>Nombre</span>
                    <span className={styles.medida}>Medida</span>
                </div>
                <div>
                    {/* <span className={styles.id}>Id</span> */}
                    <span className={styles.name}>Nombre</span>
                    <span className={styles.medida}>Medida</span>
                </div>
            </div>
            <div className={styles.container}>
                {ingredients.map((element, index) => (
                    <CardIngredient
                        id={element.id}
                        name={element.name}
                        medida={element.type_measure}
                        key={index}
                    />
                ))}
            </div>
        </div>
  )
}

export default IngredientsCards
