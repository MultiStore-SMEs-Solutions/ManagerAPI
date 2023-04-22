/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import "./App.css";
import axios from "axios";
import { Route, useHistory, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import CreateItemMenu from "./Pages/Menu/CreateOrUpdate/CreateItemMenu";
import EditStore from "./Pages/EditStore/EditSore";
import Menu from "./Pages/Menu/Menu";
import Ingredients from "./Pages/Ingredients/Ingredients";
import GetRecipe from "./Pages/Recipe/Get/GetRecipe";
import UpdateIngredient from "./Pages/UpdateIngredient/UpdateIngredient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeLoginStatus } from "./redux/Actions/actions";
import DetailRecipe from "./Pages/Recipe/DetailRecipe/DetailRecipe";
import NavBar from "./Shared/NavBar/NavBar";
import LateralBar from "./components/LateralBar/LateralBar";
import Orders from "./Pages/Orders/ContainerOrders";
import MySales from "./Pages/MySales/MySales";
import ClosingSales from "./components/Closing_Sales/ClosingSales";
import CreateRecipe from "./components/Recipe/Create/CreateRecipe";

//! sockets

// import io from 'socket.io-client'
// export const socket = io('http://localhost:3001/')

function App() {
    const loginStatus = useSelector((state) => state.loginStatus);
    const dispatch = useDispatch();
    const history = useHistory();
    const userLogin = window.localStorage.getItem("userLogin");

    // useEffect(() => {
    //   if (!loginStatus) {
    //     history.push("/");
    //   }
    // }, [loginStatus]);

    // Se cambio la verificacion del login a estadoLocal.

    useEffect(() => {
        // socket.emit('prueba', { data: 'bienvendo a socket io' }, () => {
        //   console.log('conexion exitosa')
        // })

        if (userLogin === "false" || !userLogin) {
            history.push("/");
        } else {
            dispatch(changeLoginStatus(true));
            history.push("/menu");
        }
    }, [userLogin]);
    return (
        <div className="App">
            {loginStatus && <Route path="/" component={NavBar} />}
            {loginStatus && <Route path="/" component={LateralBar} />}
            {!loginStatus && <Route exact path="/" component={LoginPage} />}
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/menu/create" component={CreateItemMenu} />
          
            <Route exact path="/recipe" component={GetRecipe} />
            <Route exact path="/ingredient" component={Ingredients} />
            <Route exact path="/ingredient/create" component={Ingredients} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/sales" component={MySales} />
            <Route exact path="/menu/update/:id" component={CreateItemMenu} /> 
            <Route exact path="/recipe/update/:id" component={DetailRecipe} />
            <Route exact path="/recipe/create" component={CreateRecipe}/>
            {/* <Route exact path="/dashboard" /> */}
            {/* menu */}
            {/* <Route exact path="/menu" component={Menu} />
      <Route exact path="/menu/create" component={CreateItemMenu} />*/}
            {}
            {/* <Route exact path="/recipe/create" />
      <Route exact path="/recipe" component={GetRecipe} />*/}
            {}
            {/* <Route exact path="/ingredient" component={Ingredients} />
      <Route exact path="/ingredient/create" component={Ingredients} /> */}
            {}
            {/* <Route exact path="/profile" />
      <Route exact path="/store" />
      <Route exact path="/orders" /> */}
            {/* <Route exact path="/store/update" component={EditStore} /> */}
            <div id="alert" className="alert"></div>
        </div>
    );
}

export default App;
