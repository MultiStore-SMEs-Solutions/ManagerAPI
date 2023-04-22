/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React from "react";
import style from "./RecipeDetail.module.css";
//import Title from "../../../Shared/Title/Title";
import { useFormik } from "formik";
//import * as Yup from "yup";

export default function   RecipeDetail({ receta }) {

  const formik = useFormik({
    initialValues: {
      id: receta?.id || "",
      name: receta?.name || "",
      details: receta?.details || "",
      stock: receta?.produced_amount || "",
      active: receta?.active || "",
      ingredients:(receta?.Ingredients)?.map((ing) => ing.name) || "",
     
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
 
  return (
    <div className={style.menuItem}>
      <div className={style.container}>
        <form
          action=""
          className={style.formBox}
          onSubmit={formik.handleSubmit}
        >
          <div className={style.formLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={style.logoForm}
            >
              <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
              <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
            </svg>
          </div>

         <div className={style.formula}> 
            <div className={style.campo_nombre}>
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                className={formik.errors.name ? style.errorInput : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>

            <div className={style.campo_detalles}>
              <label>Detalles</label>
              <textarea rows="10" cols="70"
                type="text"
                name="details"
                className={formik.errors.description ? style.errorInput : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
              />
              
            </div>

            <div className={style.campo_ingredientes}>
              <label>Ingredientes</label>
              <textarea rows="10" cols="50"
                type="text"
                name="details"
                className={formik.errors.description ? style.errorInput : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ingredients}
              />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

