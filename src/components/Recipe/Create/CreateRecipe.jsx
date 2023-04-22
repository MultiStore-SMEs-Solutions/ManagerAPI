/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createRecipe, getAllIngredients } from '../../../redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux'

import { useFormik } from "formik";
import * as Yup from "yup";

import styles from'./CreateRecipe.module.css'

const validate = (input) => {
	let errors = {};
  
	if (!input.name.trim() || !/^[A-Za-z\s]+$/g.test(input.name)) {
	  errors.name = "el nombre es requerido";
	}
	if (!input.type_measure.trim() || !/^[A-Za-z\s]+$/g.test(input.type_measure)) {
		errors.type_measure = "se requiere un tipo de medida";
	  }
	// --------------------------------------------------
	if (!input.waste_rate || !/^[0-9]\d*(\.\d+)?$/.test(input.waste_rate)) {
	  errors.waste_rate = "se requiere una cantidad";
	}
	if (!input.per_recipe || !/^[1-9]\d*(\.\d+)?$/.test(input.per_recipe)) {
	  errors.per_recipe = "se requiere una cantidad mayor a 0";
	}
	return errors
}

const CreateRecipe = () => {
	const ingredients = useSelector(state => state.ingredients)
	const [ingredient , setIngredient] = useState([])
	const [quantity, setQuantity] = useState([])

	const [errors, setErrors] = useState({})
	const [saveInputs, setSaveInputs] = useState([])
	const [input, setInput] = useState({
		id: null,
		name: "",
		layer: 0,
		type_measure: "",
		waste_rate: 0,
		per_recipe: 0,
	})

	const dispatch = useDispatch()

	useEffect(()=>{
		if (!ingredients.length) {
			dispatch(getAllIngredients())
		  }
	}, [dispatch, ingredients])

	const setIngredientState = (e) =>{
	    const ingre = ingredients.find((item) => e.target.value === item.name);
        if (ingre) {
            if (!ingredient.includes(ingre)) {
                setIngredient([...new Set([...ingredient, ingre])]);
                setQuantity([...quantity, 0]);
				setInput({
					...input,
					name: ingre.name,
					id: ingre.id,
					layer: ingre.layer,
					// type_measure: ingre.type_measure
				})
                e.target.value = "";
            }
        }
	}

const setInputs = (e) =>{
	const value = e.target.value
	const property = e.target.name
	setInput({
		...input,
		[property]: value
	})

	setErrors(
		validate({
		  ...input,
		  [property]: value,
		})
	  );
}

const deleteIngredient =(e)=>{
	e.preventDefault()
	const value = e.target.value
	setSaveInputs(
	    saveInputs.filter(elem => parseInt(elem.id) !== parseInt(value))
	)
}


	const formik = useFormik({
		initialValues: {
			name: "", 
			details: "", 
			produced_amount: 0, 
			type_measure: "", 
		},
	
		validationSchema: Yup.object({
			name: Yup.string().required('El nombre es requerido'),
			details: Yup.string().required('Se requiere una descripción de pasos'),
			produced_amount: Yup.number("Debe se ser un numero")
            .min(1, "la cantidad debe ser minimo 1")
            .required("se requiere una Cantidad"), 
			type_measure: Yup.string().required('Se requiere un tipo de medida'),
		}),
		onSubmit: (values) => {
			const esto = (arr, values) =>{
			return	arr.map(elem => {	
				let amount = elem.per_recipe / values.produced_amount
				elem["amount"] = amount
				return elem
			})
			}
			const recipeMapData = {
				...values,
				ingredArray: esto(saveInputs, values),
			}
			// alert(JSON.stringify(recipeMapData, null, 2))
			dispatch(createRecipe(recipeMapData))
		},
	  })

	  const addInputs = (e)=>{
		e.preventDefault()
		if (
			Object.keys(errors).length === 0 &&
			input.name !== "" &&
			input.type_measure !== "" &&
			input.per_recipe !== 0 ) {

				setSaveInputs([
					...saveInputs, input
				])

				setInput({
					id: null,
					name: "",
					layer: 0,
					type_measure: "",
					waste_rate: 0,
					per_recipe: 0,
				})
			}

	  }
  return (
		<div className={styles.container}>
			<div className={styles.container2}>
			<form action="" onSubmit={formik.handleSubmit} className={styles.formBox}>
			  <div className={styles.one}>
				<div className={styles.right}>
				  <div>
				    <div className={styles.col}>
					  <label htmlFor="name">Nombre</label>
					  <input 
					  	className={formik.errors.name ? styles.errorInput : ''}
						type="text"
						name="name"
						placeholder="Nombre"
						{...formik.getFieldProps('name')}
					  />
						{formik.touched.name && formik.errors.name
					? (
					<label className={styles.errorText}>{formik.errors.name}</label>
					)
					: null}
				    </div>

					<div className={styles.medidas}>
					  <div className={styles.col}>
						<label htmlFor="quantity">Cantidad Producida</label>
						<input 
						  	className={formik.errors.produced_amount ? styles.errorInputNumber  : ''}
							type="number"
							name="produced_amount"
							placeholder="Cantidad"
							{...formik.getFieldProps('produced_amount')}
							 />
							 	{formik.touched.produced_amount && formik.errors.produced_amount
					? (
					<label className={styles.errorText}>{formik.errors.produced_amount}</label>
					)
					: null}
					  </div>

					  <div className={styles.col}>
						<label htmlFor="type_measure">Tipo de Medida</label>
						<select
						id="esto"
					  	className={formik.errors.type_measure ? styles.errorInput : ''}
						name='type_measure'
						{...formik.getFieldProps('type_measure')}
						>
							<option>opciones</option>
							<option value="un">un</option>
                            <option value="gr">gr</option>
                            <option value="ml">ml</option>
                            <option value="hs">oz</option>
					    </select>
						{formik.touched.type_measure && formik.errors.type_measure
					? (
					<label className={styles.errorText}>{formik.errors.type_measure}</label>
					)
					: null}
			           </div>
					</div>
					</div>
					<div className={styles.col}> 
					  <label htmlFor="details">Descripción</label>
					  <textarea 
					  	className={formik.errors.details ? styles.errortxt : styles.text}
					  	// className={styles.text}
						placeholder='descripción'
					    name="details" 
					    {...formik.getFieldProps('details')}
					  >
					  </textarea>
					  {formik.touched.details && formik.errors.details
					? (
					<label className={styles.errorText}>{formik.errors.details}</label>
					)
					: null}
				    </div>
				</div>

		    <div className={styles.left}>
        	  <div className={styles.tow}>
				  <div className={styles.col}>
					<label htmlFor="ingredientes">Añadir Ingredientes</label>
					<input
					className={errors.name ? styles.errorInput : ''}
                    type="text"
					//se cambio "name" por "ingredients"
					name="ingredients"
					value={input.name}
                    list="ingredientes"
                    placeholder="Ingredientes"
                    onChange={setIngredientState}
                    />
					 {errors.name && errors.name
					? (
					<label className={styles.errorText}>{errors.name}</label>
					)
					: null}
				  </div>
				  <div className={styles.col}> 
					<label htmlFor="cantidad">Cantidad</label>
						<input 
							className={errors.per_recipe ? styles.errorInput : ''}
							type="number"
							placeholder= "Cantidad"
							name="per_recipe"
							value={input.per_recipe}
							onChange={setInputs}
						/>
					{errors.per_recipe && errors.per_recipe
					? (
					<label className={styles.errorText}>{errors.per_recipe}</label>
					)
					: null}
				  </div>

				  <div className={styles.col}>
					<label htmlFor="type_measure">Tipo de Medida</label>
						<select
						className={errors.type_measure ? styles.errorInput : ''}
						name='type_measure'
						value={input.type_measure}
						onChange={setInputs}
						>
							<option>opciones</option>
							<option value="un">un</option>
                            <option value="gr">gr</option>
                            <option value="ml">ml</option>
                            <option value="oz">hs</option>
					    </select>
						{errors.type_measure && errors.type_measure
					? (
					<label className={styles.errorText}>{errors.type_measure}</label>
					)
					: null}
				  </div>

				  <div className={styles.col}>
					<label htmlFor="t_desperdicio">Tasa de Desperdicio</label>
					<input 
					  className={errors.waste_rate ? styles.errorInput : ''}
					  type="number"
					  name="waste_rate"
					  value={input.waste_rate}
					  onChange={setInputs}
					  />
						{errors.waste_rate && errors.waste_rate
					? (
					<label className={styles.errorText}>{errors.waste_rate}</label>
					)
					: null}
				  </div>
				  <div className={styles.buttons}>
					<button onClick={addInputs} type="submit">Añadir</button>
				  </div>
				</div>
			<div className={styles.tow}>
				<div className={styles.col}>
                        <div className={styles.table}>
                            <div className={styles.rowTableTitle}>
                                <span>Nombre</span>
                                <span>Cantidad</span>
                            </div>
                            {
                            saveInputs?.map((item, i) => {
                              return (
                               <div className={styles.rowTableData} key={i}>
                                 <span style={{ fontWeight: "bold" }}>
                                    {item.name } {item.type_measure}
                                 </span>
									<span style={{ fontWeight: "bold" }} >{item.per_recipe}</span>
									<button className={styles.button} value={item.id} onClick={deleteIngredient}>x</button>
                               </div>
                              )
                            })}
                                <datalist id="ingredientes">
                                    {ingredients.map((ingrediente) => {
                                        return <option key={ingrediente.id} value={ingrediente.name}></option>;
                                    })}
                                </datalist>
                            </div>
                        </div>
				</div>
				</div>
					<div className={styles.send}>
				 		<button type="submit">Enviar</button>
					</div>
				</div>
			</form>
			</div>
         </div>
  )
}

export default CreateRecipe


