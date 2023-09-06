import {
  ADD_AFFIRMATION,
  GET_AFFIRMATION,
  AF_ERROR
  // DELETE_AFFIRMATION,
  // SET_CURRENT,
  // CLEAR_CURRENT,
  // UPDATE_AFFIRMATION,
  // CLEAR_AFFIRMATION
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_AFFIRMATION:
      return {
        ...state,
        affirmations: action.payload
      };
    case ADD_AFFIRMATION:
      return {
        ...state,
        affirmations: [action.payload, ...state.affirmations]
      };
    case AF_ERROR:
      return {
        ...state,
        error: action.payload
      };

    // case DELETE_AFFIRMATION:
    //   return {
    //     ...state,
    //     affiramtions: state.affiramtions.filter(
    //       gratitude => gratitude._id !== action.payload
    //     )
    //   };
    // case GET_AFFIRMATION:
    //   return {
    //     ...state,
    //     affiramtions: action.payload
    //   };
    // case SET_CURRENT:
    //   return {
    //     ...state,
    //     current: action.payload
    //   };

    // case CLEAR_CURRENT:
    //   return {
    //     ...state,
    //     current: null
    //   };

    // case UPDATE_AFFIRMATION:
    //   return {
    //     ...state,
    //     affirmations: state.affirmations.map(affirmation =>
    //       affirmation._id === action.payload._id ? action.payload : affirmation
    //     )
    //   };

    // case CLEAR_AFFIRMATION:
    //   return {
    //     ...state,
    //     affirmations: [],
    //     error: null,
    //     current: null
    //   };
    default:
      return state;
  }
};
