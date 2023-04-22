import { React, useEffect } from 'react'
import Register from '../../components/Register/Register'
import LateralBar from '../../components/LateralBar/LateralBar'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, getRoles } from '../../redux/Actions/actions'

import { useFormik } from 'formik'
import * as Yup from 'yup'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const roles = useSelector(state => state.roles)

  useEffect(() => {
    if (!roles.length) {
      dispatch(getRoles())
    }
  }, [dispatch, roles])

  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const passwordRegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      email: '',
      account_name: '',
      phone: '',
      password: '',
      profile_image: '',
      role_id: null
    },

    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      last_name: Yup.string().required('El apellido es requerido'),
      email: Yup.string()
        .matches(emailRegex, 'Correo electronico invalido')
        .required('El email es requerido')
        .max(100, 'máximo 100 caracteres'),
      account_name: Yup.string()
        .min(5, 'minimo 5 caracteres')
        .max(30, 'máximo 30 caracteres')
        .required('El Nombre de Usuario es requerido'),
      phone: Yup.string()
        .required('Telefono requerido')
        .matches(phoneRegExp, 'telefono invalido')
        .max(15, 'máximo 15 caracteres'),
      password: Yup.string()
        .required('Se requiere una contraseña')
        .matches(
          passwordRegExp,
          'la contraseña debe ser mayor a 8 digitos y contener mayúsculas y números'
        ),
      role_id: Yup.number()
        .required('selecciona un rol'),
      profile_image: Yup.string()
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      dispatch(createUser(values))
    }
  })
  // console.log(formik.values.profile_image)

  const selectQuestion = (e) => {
    const value = e.target.value
    formik.values.password_question = value
  }

  const imageFn = (imageUrl) => {
    formik.values.profile_image = imageUrl
  }

  return (
    <div>
      <LateralBar />
      <Register formik={formik} selectQuestion={selectQuestion} imageFn={imageFn} roles={roles} />
    </div>
  )
}

export default RegisterPage
