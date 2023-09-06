import {
  ADD_GRAT,
  DELETE_GRAT,
  GET_GRATTITUDE,
  CLEAR_GRATTITUDE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GRATTITUDE,
  GRAT_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_GRAT:
      return {
        ...state,
        gratitudes: [action.payload, ...state.gratitudes]
      };

    case DELETE_GRAT:
      return {
        ...state,
        gratitudes: state.gratitudes.filter(
          gratitude => gratitude._id !== action.payload
        )
      };
    case GET_GRATTITUDE:
      return {
        ...state,
        gratitudes: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case UPDATE_GRATTITUDE:
      return {
        ...state,
        gratitudes: state.gratitudes.map(gratitude =>
          gratitude._id === action.payload._id ? action.payload : gratitude
        )
      };
    case GRAT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_GRATTITUDE:
      return {
        ...state,
        gratitudes: [],
        error: null,
        current: null
      };
    default:
      return state;
  }
};
