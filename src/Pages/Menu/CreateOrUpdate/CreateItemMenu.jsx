/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useLocation, useParams } from "react-router-dom";
import Form from "../../../components/createItemMenu/Form";
// import NavBar from '../../../Shared/NavBar/NavBar'

import { useDispatch, useSelector } from "react-redux";
import {
  getAllIngredients,
  getMenu,
  getTags,
} from "../../../redux/Actions/actions";
import { useEffect } from "react";

import styles from "./CreateOrUpdate.module.css";

export default function CreateItemMenu() {
  // get Route [create | update]
  const route = useLocation().pathname.split("/").at(2);
  // se puede mejorar, si es create aun asi busca menus y eso esta mal

  const menus = useSelector((state) => state.menus);
  const ingredients = useSelector((state) => state.ingredients);

  const tags = useSelector((state) => state.tags);
  const { id } = useParams();
  const itemMenu = menus.find((item) => item.id === parseInt(id));
  

  const dispatch = useDispatch();

  useEffect(() => {
    if (route === "update" && !menus.length) {
      dispatch(getMenu());
    }

    if (!ingredients.length) {
      dispatch(getAllIngredients());
      dispatch(getTags());
    }
  }, [menus, ingredients]);

  return (
    <div className={styles.container}>
      {/* <NavBar /> */}

      {route === "update" ? (
        menus.length ? (
          <Form path={route} ingredientes={ingredients} menu={itemMenu} tags={tags} />
        ) : (
          "Loading"
        )
      ) : (
        <Form path={route} ingredientes={ingredients} tags={tags} />
      )}
    </div>
  );
}
