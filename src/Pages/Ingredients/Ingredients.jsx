import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IngredientsCards from '../../components/IngredientsCards/IngredientsCards'
import { getAllIngredients } from '../../redux/Actions/actions'
import styles from './Ingredients.module.css'
import { useLocation } from 'react-router-dom'
import CreateIngredientForm from '../../components/CreateIngredient/CreateIngredient'

const Ingredients = () => {
  const ingredients = useSelector(state => state.ingredients)
  const dispatch = useDispatch()
  const location = useLocation().pathname

  useEffect(() => {
    !ingredients.length && dispatch(getAllIngredients())
  },[])
  //})
  return (
      <div className={styles.page}>
          {location === '/ingredient/create' && <CreateIngredientForm />}
          <IngredientsCards />
      </div>
  )
}

export default Ingredients
