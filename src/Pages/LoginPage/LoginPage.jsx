import React, { useEffect } from "react";
import Login from "../../components/Login/Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validateLogin } from "../../redux/Actions/actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
    const loginStatus = useSelector((state) => state.loginStatus);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (loginStatus) {
            history.push("/menu");
        }
    }, [loginStatus]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Correo incorrecto").required("Correo requerido"),

            password: Yup.string().required("Contraseña requerida"),
        }),
        onSubmit: async (values) => {
            dispatch(validateLogin(values));
        },
    });

    return (
        <>
            <Login formik={formik} />
        </>
    );
};

export default LoginPage;
