import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './CreateIngredient.module.css'
import { useDispatch } from 'react-redux'
import { createIngredients } from '../../redux/Actions/actions'

const CreateIngredientForm = () => {
  const [numForm, setNumForm] = useState([1])
  const [values, setValues] = useState([
    { name: '', type_measure: 'un', layer: 0, ingredients_all: [] }
  ])

  const dispatch = useDispatch()

  const handleNumForm = (event) => {
    event.preventDefault()
    setNumForm([...numForm, 1])
    setValues([
      ...values,
      { name: '', type_measure: 'un', layer: 0, ingredients_all: [] }
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const filtered = values.filter(e => e.name.trim() !== '')
    dispatch(createIngredients(filtered))
    setValues([{ name: '', type_measure: 'un', layer: 0, ingredients_all: [] }])
    setNumForm([1])
  }

  const handleChange = (event, index) => {
    const { value } = event.target
    const { name } = event.target
    const newArray = [...values]
    newArray[index][name] = value
    // const otroArray = newArray
    setValues([...newArray])
  }

  return (
        <div className={style.createIngredient}>
            <div className={style.container}>
                <Link to="/ingredient">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5392/5392869.png"
                        alt=""
                    />
                </Link>
                <h1>Crear Ingredientes</h1>
                <form>
                    <div className={style.description}>
                        <span className={style.name}>Nombre</span>
                        <span>Unidad de medida</span>
                    </div>
                    <div className={style.ingredients}>
                        <div className={style.divInfo}>
                        <div className={style.divButton}>
                        <button onClick={handleNumForm} className={style.buttonNew}>
                            Nuevo
                        </button>
                        </div>
                            {numForm.map((element, index) => (
                                <div className={style.inputs} key={index}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder=' Nombre'
                                        // value={values[index].name}
                                        onChange={(e) => handleChange(e, index)}
                                        value={values[index].name}
                                    />
                                    <select
                                        name="type_measure"
                                        id=""
                                        // value={values[index].type}
                                        onChange={(e) => handleChange(e, index)}
                                        value={values[index].type_measure}>
                                        <option value="un">un</option>
                                        <option value="gr">gr</option>
                                        <option value="ml">ml</option>
                                        <option value="oz">oz</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    
                    </div>
                    <button className={style.submit} onClick={handleSubmit}>
                        Crear
                    </button>
                </form>
            </div>
        </div>
  )
}

export default CreateIngredientForm
