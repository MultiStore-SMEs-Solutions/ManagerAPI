/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-case-declarations */
import Alert from '../../Shared/Alert/Alert'
import {
  GET_MENU,
  ERROR,
  GET_ALL_INGREDIENTS,
  FILTER,
  CREATE_MENU,
  UPDATE_MENU,
  GET_INGREDIENT_ID,
  LOGIN_STATUS,
  CREATE_INGREDIENTS,
  GET_ROLES, GET_RECETA,
  ORDER_BY_PRICE,
  FILTER_BY_TAG,
  ORDER_BY_RECOMMENDATION,
  SORT_BY_ACTIVITY,
  ORDER_BY_QUANTITY,
  GET_ORDERS,
  DELETE_INGREDIENT,
  DELETE_RECIPE,
  GET_BALANCE,
  DELETE_MENU, GET_TAGS
} from '../Actions/types'
import { createRoot } from 'react-dom/client'

const initialState = {
  loginStatus: false,
  menus: [],
  ingredients: [],
  ingredientDetail: {},
  errors: false,
  render: [],
  statusFilter: true,
  roles: [],
  render_receta:[],
  orders: [],
  tags: [],
  balance:{}
}
// console.log(initialState.render);
const filterFunction = (status, array) => {
  let newRender
  if (status) {
    newRender = array.filter((element) => element.recomend_first === true)
  } else newRender = [...array]
  return newRender
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MENU:
      const newState = state.menus?.filter(ele=>ele.id!==action.payload)
      return {
        ...state, menus:[...newState], render:[...newState]
      }
    case GET_BALANCE:
      return {
        ...state, balance:{...action.payload}
      }
    case LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload

      }
    case FILTER:
      return {
        ...state,
        statusFilter: !state.statusFilter,
        render: filterFunction(state.statusFilter, state.menus)
      }
    case GET_MENU:
      return { ...state, menus: action.payload, render: [...action.payload] }
    case CREATE_MENU:
      return { ...state, menus: [...state.menus, action.payload] }
    case UPDATE_MENU:
      const newMenu = [...state.menus].filter(
        (menu) => menu.id !== action.payload.id
      )
      newMenu.unshift(action.payload)

      return { ...state, menus: newMenu, render: newMenu }
    case GET_ALL_INGREDIENTS:
      return { ...state, ingredients: action.payload }
    case GET_INGREDIENT_ID:
      return { ...state, ingredientDetail: action.payload }
    case CREATE_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, ...action.payload] }
    case DELETE_INGREDIENT:
      const ingredients = state.ingredients?.filter(element => element.id !== action.payload)
      return {
        ...state, ingredients:[...ingredients],
      }
    case ERROR:
      const root = createRoot(document.getElementById('alert'))
      root.render(<Alert title="Error" message={action.payload} type="danger" />)
      return { ...state, errors: action.payload }
      
      case GET_ROLES:
      return { ...state, roles: action.payload }
    case DELETE_RECIPE:
      const recipes = state.render_receta?.filter(element => element.id !== action.payload)
      return {
        ...state, render_receta: [...recipes]
      }
        
              case GET_RECETA:
              return { ...state, recetas: action.payload, render_receta: [...action.payload] };

      case ORDER_BY_PRICE:
      let sortPrice =
        action.payload === "mayor"
          ? state.render.sort((a, b) => {
              return b.price - a.price;
            })
          : state.render.sort((a, b) => {
              return a.price - b.price;
            });
      // console.log(sortPrice)
      return {
        ...state,
        render: sortPrice,
      };

      case ORDER_BY_QUANTITY:
        let sortQuantity =
          action.payload === "mayor"
            ? state.render.sort((a, b) => {
                return b.stock - a.stock;
              })
            : state.render.sort((a, b) => {
                return a.stock - b.stock;
              });
        // console.log(sortPrice)
        return {
          ...state,
          render: sortQuantity,
        };

      case FILTER_BY_TAG:
        return { ...state, render: action.payload }
      case ORDER_BY_RECOMMENDATION:
        return { ...state, render: action.payload }
      case SORT_BY_ACTIVITY:
        return { ...state, render: action.payload }
      case GET_ORDERS:
        return { ...state, orders: action.payload}
      case GET_TAGS:
        return { ...state, tags: action.payload}
    default:
      return { ...state }
  }
}

export default rootReducer
