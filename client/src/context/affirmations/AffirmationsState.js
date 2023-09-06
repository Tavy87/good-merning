import React, { useReducer } from "react";
import axios from "axios";
import affirmationsReducer from "./affirmationsReducer";
import AffirmationsContext from "./affirmationsContext";
import { ADD_AFFIRMATION, GET_AFFIRMATION, AF_ERROR } from "../types";

const AffirmationsState = props => {
  const initialState = {
    affirmations: [],
    current: null
  };

  const [state, dispatch] = useReducer(affirmationsReducer, initialState);

  // Get Affirmations
  const getAffirmation = async () => {
    const res = await axios.get("/api/affirmation");
    try {
      dispatch({
        type: GET_AFFIRMATION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AF_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Affirmations
  const addAffirmation = async affirmation => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/affirmation", affirmation, config);
      dispatch({
        type: ADD_AFFIRMATION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AF_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Affirmations

  // Edit Affirmations

  // Set Current

  // Clear Current

  return (
    <AffirmationsContext.Provider
      value={{
        affirmations: state.affirmations,
        current: state.current,
        error: state.error,
        addAffirmation,
        // deleteAffirmation,
        // updateAffirmation,
        getAffirmation
        // clearAffirmation
      }}
    >
      {props.children}
    </AffirmationsContext.Provider>
  );
};

export default AffirmationsState;
