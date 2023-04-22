import React from "react";
import styles from "./NavBar.module.css";
import img from "./image/logoFinal.jpg";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { changeLoginStatus } from "../../redux/Actions/actions";

const NavBar = () => {
    const location = useLocation().pathname.split("/").at(1);
    const dispatch = useDispatch();
    const userData = JSON.parse(window.localStorage.getItem("userData"));

    function handleResetUserLogin() {
        try {
            window.localStorage.setItem("userLogin", "false");
            window.localStorage.removeItem("userData");
        } catch (error) {
            console.error(error);
        }
        dispatch(changeLoginStatus(false));
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={img} alt="" className={styles.logo} />
            </div>
            <div className={styles.userContainer}>
                {userData.img && <img src={userData.img} alt="" />}
                {userData.name && <span>{userData.name}</span>}
            </div>
            {/* <h1>DashBoard</h1> */}
            <div className={styles.buttons}>
                <Link to="/register">
                    <button className={location === "register" ? styles.currentPag : ""}>
                        Registros
                    </button>
                </Link>

                <Link to="/">
                    <button onClick={() => handleResetUserLogin()}>Salir</button>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
