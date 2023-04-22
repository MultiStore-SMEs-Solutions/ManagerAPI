/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CardRecipe.module.css";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { deleteRecipe } from "../../redux/Actions/actions";

const CardRecipe = (props) => {
  //console.log(props)
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteRecipe(props.id))
  }
  return (
      <div className={styles.card}>
          <div className={styles.name}>
              <h5>{props.name}</h5>
              {/* <span>Hamburguesa</span> */}
          </div>

          <div className={styles.ico}>
              <Link to={`/recipe/update/${props.id}`}>
                  <img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" alt="" />
              </Link>
          </div>
          <div className={styles.image}>
              <img src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png" alt="" onClick={handleDelete}/>
          </div>
      </div>
  );
};

export default CardRecipe;
