/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// import Title from '../../Shared/Title/Title'
// import img from './image/image-1.jpg'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getImageUrl } from '../../redux/Actions/actions'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { grey } from '@mui/material/colors';
import styles from './Register.module.css'

const Register = ({ formik, selectQuestion, imageFn, roles }) => {
  const dispatch = useDispatch()

  const [imageInputState, setImageInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  useEffect(()=>{
    dispatch(getImageUrl(previewSource, imageFn))
  }, [previewSource, dispatch])

  const handleImageInputChange = async (e) => {
    const inputImg = e.target.files[0]
    await prepareImageToShowAndSend(inputImg)
  }
  
  const prepareImageToShowAndSend = (inputImg) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(inputImg)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
        resolve()
      }
      reader.onerror = () => {
        reject(reader.error)
      }
    })
  }

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <form
          className={styles.formBox}
          action=""
          onSubmit={formik.handleSubmit}
        >
          {/* <div className={styles.formLeft}>
            <img src={img} alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={styles.logoForm}
            >
              <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
              <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
            </svg>
          </div> */}
          <div className={styles.formRight}>
            {/* //! TODO */}
            {/* 
                Hacer que la imagen aparezca una vez se establece
                Si esa imagen Url existe => "+ Agregar Imagen" cambia por "Modificar Imagen"
              */}
            {/* {previewSource && (
                <img src={previewSource} alt="Profile Pic" className={styles.imageUser}/>
              )} */}
            <div className={styles.contentfile}>
              {
                previewSource ? 
                <img src={previewSource} alt="Profile Pic" className={styles.imageUser}/> :
                <AccountCircleIcon  sx={{ color: grey[500] , fontSize: 80, mt: 2 }}></AccountCircleIcon>
              }
              <input
                type="file"
                name="image"
                className={styles.inputfile}
                onChange={handleImageInputChange}
                value={imageInputState}
              />
            </div>
            <div className={styles.row}>
            <div className={styles.inputData}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                placeholder="nombre"
                className={formik.errors.name ? styles.errorInput : ''}
                id="name"
                name="name"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name
                ? (
                <label className={styles.errorText}>{formik.errors.name}</label>
                  )
                : null}
            </div>
            <div className={styles.inputData}>
              <label htmlFor="last_name">Apellido</label>
              <input
                type="text"
                placeholder="apellido"
                className={formik.errors.last_name ? styles.errorInput : ''}
                id="last_name"
                name="last_name"
                {...formik.getFieldProps('last_name')}
              />
              {formik.touched.last_name && formik.errors.last_name
                ? (
                <label className={styles.errorText}>
                  {formik.errors.last_name}
                </label>
                  )
                : null}
            </div>
            </div>
            <div className={styles.inputs}>
              <label htmlFor="account_name">Nombre de usuario</label>
              <input
                type="text"
                placeholder="nombre de usuario"
                className={formik.errors.account_name ? styles.errorInput : ''}
                id="account_name"
                name="account_name"
                {...formik.getFieldProps('account_name')}
              />
              {formik.touched.account_name && formik.errors.account_name
                ? (
                <label className={styles.errorText}>
                  {formik.errors.account_name}
                </label>
                  )
                : null}
            </div>
            <div className={styles.inputs}>
              <label htmlFor="phone">Telefono</label>
              <input
                type="text"
                placeholder="telefono"
                className={formik.errors.phone ? styles.errorInput : ''}
                id="phone"
                name="phone"
                {...formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone
                ? (
                <label className={styles.errorText}>
                  {formik.errors.phone}
                </label>
                  )
                : null}
            </div>
            <div className={styles.inputs}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="correo"
                className={formik.errors.email ? styles.errorInput : ''}
                id="email"
                name="email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email
                ? (
                <label className={styles.errorText}>
                  {formik.errors.email}
                </label>
                  )
                : null}
            </div>
            <div className={styles.inputs}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder="contraseña"
                className={formik.errors.password ? styles.errorInput : ''}
                id="password"
                name="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password
                ? (
                <label className={styles.errorText}>
                  {formik.errors.password}
                </label>
                  )
                : null}
            </div>
            <div className={styles.inputs}>
              <label htmlFor="">Rol</label>
              <select
                name="role_id"
                id="rol_id"
                value=""
                className={formik.errors.role_id ? styles.errorSelect : styles.select}
                onChange={(e) => selectQuestion(e)}
                {...formik.getFieldProps('role_id')}
              >
                <option className={styles.options} value="">
                  opciones
                </option>
                {roles.map((quest) => (
                  <option key={quest.id} value={quest.id} className={styles.options}>
                    {quest.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputs}>
              <button type="submit">Registrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
