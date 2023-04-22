/* eslint-disable react/react-in-jsx-scope */
import { useLocation, useParams } from "react-router-dom";
import RecipeDetail from "../../../components/Recipe/DetailRecipe/RecipeDetail.jsx";
import NavBar from "../../../Shared/NavBar/NavBar";

import { useDispatch, useSelector } from "react-redux";
import { getReceta } from "../../../redux/Actions/actions";
import { useEffect } from "react";

export default function DetailRecipe() {
  // get Route [create | update]
  const route = useLocation().pathname.split("/").at(2);
  // se puede mejorar, si es create aun asi busca menus y eso esta mal
  const recetas = useSelector((state) => state.render_receta);
  const { id } = useParams();
  
  const itemReceta = recetas.find((item) => item.id === parseInt(id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (route === "update" && !recetas.length) {
      dispatch(getReceta());
    }
  }, [recetas, dispatch, route]);
  return (
    <div>
      <NavBar />
      {route === "update" ? (
        recetas.length ? (
          <RecipeDetail path={route} receta={itemReceta} />
        ) : (
          "Loading"
        )
      ) : (
        <RecipeDetail path={route} />
      )}
    </div>
  );
}
